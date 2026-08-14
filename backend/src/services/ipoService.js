const pool = require("../db/pool");

function mapIpo(row) {
  const issuePrice = row.issue_price === null ? null : Number(row.issue_price);
  const gmp = row.gmp === null ? null : Number(row.gmp);

  return {
    id: row.id,
    companyName: row.company_name,
    ipoName: row.ipo_name,
    openDate: row.open_date,
    closeDate: row.close_date,
    listingDate: row.listing_date,
    issuePrice,
    lotSize: row.lot_size,
    issueSizeCrore: row.issue_size_crore === null ? null : Number(row.issue_size_crore),
    freshIssueCrore: row.fresh_issue_crore === null ? null : Number(row.fresh_issue_crore),
    ofsCrore: row.ofs_crore === null ? null : Number(row.ofs_crore),
    status: row.status,
    gmp,
    estimatedListingPrice:
      issuePrice !== null && gmp !== null ? Number((issuePrice + gmp).toFixed(2)) : null,
    estimatedGainPercent:
      issuePrice && gmp !== null ? Number(((gmp / issuePrice) * 100).toFixed(2)) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function getAllIpos({ status } = {}) {
  const values = [];
  let where = "";

  if (status) {
    values.push(status.toUpperCase());
    where = `WHERE i.status = $1`;
  }

  const query = `
    SELECT
      i.*,
      latest.gmp
    FROM ipos i
    LEFT JOIN LATERAL (
      SELECT gh.gmp
      FROM gmp_history gh
      WHERE gh.ipo_id = i.id
      ORDER BY gh.recorded_at DESC
      LIMIT 1
    ) latest ON TRUE
    ${where}
    ORDER BY i.open_date DESC NULLS LAST, i.id DESC
  `;

  const { rows } = await pool.query(query, values);
  return rows.map(mapIpo);
}

async function getIpoById(id) {
  const query = `
    SELECT
      i.*,
      latest.gmp
    FROM ipos i
    LEFT JOIN LATERAL (
      SELECT gh.gmp
      FROM gmp_history gh
      WHERE gh.ipo_id = i.id
      ORDER BY gh.recorded_at DESC
      LIMIT 1
    ) latest ON TRUE
    WHERE i.id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  if (!rows[0]) return null;

  const ipo = mapIpo(rows[0]);

  const subscriptionResult = await pool.query(
    `SELECT retail, nii, qib, employee
     FROM subscriptions
     WHERE ipo_id = $1`,
    [id]
  );

  const subscription = subscriptionResult.rows[0]
    ? {
        retail: Number(subscriptionResult.rows[0].retail),
        nii: Number(subscriptionResult.rows[0].nii),
        qib: Number(subscriptionResult.rows[0].qib),
        employee: Number(subscriptionResult.rows[0].employee)
      }
    : null;

  return { ...ipo, subscription };
}

async function getGmpHistory(id) {
  const { rows } = await pool.query(
    `SELECT id, gmp, recorded_at
     FROM gmp_history
     WHERE ipo_id = $1
     ORDER BY recorded_at ASC`,
    [id]
  );

  return rows.map((row) => ({
    id: row.id,
    gmp: Number(row.gmp),
    recordedAt: row.recorded_at
  }));
}

module.exports = {
  getAllIpos,
  getIpoById,
  getGmpHistory
};
