CREATE TABLE IF NOT EXISTS ipos (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    ipo_name VARCHAR(255) NOT NULL,
    open_date DATE,
    close_date DATE,
    listing_date DATE,
    issue_price NUMERIC(10,2),
    lot_size INTEGER,
    issue_size_crore NUMERIC(12,2),
    fresh_issue_crore NUMERIC(12,2),
    ofs_crore NUMERIC(12,2),
    status VARCHAR(50) NOT NULL DEFAULT 'UPCOMING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gmp_history (
    id SERIAL PRIMARY KEY,
    ipo_id INTEGER NOT NULL REFERENCES ipos(id) ON DELETE CASCADE,
    gmp NUMERIC(10,2) NOT NULL,
    recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    ipo_id INTEGER NOT NULL UNIQUE REFERENCES ipos(id) ON DELETE CASCADE,
    retail NUMERIC(10,2),
    nii NUMERIC(10,2),
    qib NUMERIC(10,2),
    employee NUMERIC(10,2)
);

CREATE INDEX IF NOT EXISTS idx_ipos_status
    ON ipos(status);

CREATE INDEX IF NOT EXISTS idx_ipos_open_date
    ON ipos(open_date);

CREATE INDEX IF NOT EXISTS idx_gmp_history_ipo_id_recorded_at
    ON gmp_history(ipo_id, recorded_at DESC);


-- =========================================================
-- IPO DATA
-- =========================================================

INSERT INTO ipos
(
    company_name,
    ipo_name,
    open_date,
    close_date,
    listing_date,
    issue_price,
    lot_size,
    issue_size_crore,
    fresh_issue_crore,
    ofs_crore,
    status
)
VALUES
(
    'Aarav Technologies',
    'Aarav Technologies IPO',
    '2026-08-10',
    '2026-08-12',
    '2026-08-17',
    220,
    68,
    2500,
    1800,
    700,
    'OPEN'
),
(
    'Nexa Consumer Products',
    'Nexa Consumer Products IPO',
    '2026-08-13',
    '2026-08-18',
    '2026-08-21',
    150,
    100,
    1200,
    900,
    300,
    'UPCOMING'
),
(
    'Vertex Healthcare',
    'Vertex Healthcare IPO',
    '2026-08-04',
    '2026-08-06',
    '2026-08-11',
    310,
    48,
    1850,
    1300,
    550,
    'LISTED'
);


-- =========================================================
-- SUBSCRIPTION DATA
-- =========================================================

INSERT INTO subscriptions
(
    ipo_id,
    retail,
    nii,
    qib,
    employee
)
SELECT
    id,
    6.72,
    8.32,
    4.21,
    3.10
FROM ipos
WHERE company_name = 'Aarav Technologies';


INSERT INTO subscriptions
(
    ipo_id,
    retail,
    nii,
    qib,
    employee
)
SELECT
    id,
    2.45,
    3.18,
    5.22,
    1.80
FROM ipos
WHERE company_name = 'Nexa Consumer Products';


INSERT INTO subscriptions
(
    ipo_id,
    retail,
    nii,
    qib,
    employee
)
SELECT
    id,
    10.25,
    15.40,
    22.10,
    4.50
FROM ipos
WHERE company_name = 'Vertex Healthcare';


-- =========================================================
-- GMP HISTORY
-- =========================================================

-- Aarav Technologies
INSERT INTO gmp_history
(
    ipo_id,
    gmp,
    recorded_at
)
SELECT
    id,
    50,
    TIMESTAMP '2026-08-07 10:00:00'
FROM ipos
WHERE company_name = 'Aarav Technologies'

UNION ALL

SELECT
    id,
    65,
    TIMESTAMP '2026-08-08 10:00:00'
FROM ipos
WHERE company_name = 'Aarav Technologies'

UNION ALL

SELECT
    id,
    72,
    TIMESTAMP '2026-08-09 10:00:00'
FROM ipos
WHERE company_name = 'Aarav Technologies'

UNION ALL

SELECT
    id,
    80,
    TIMESTAMP '2026-08-10 10:00:00'
FROM ipos
WHERE company_name = 'Aarav Technologies';


-- Nexa Consumer Products
INSERT INTO gmp_history
(
    ipo_id,
    gmp,
    recorded_at
)
SELECT
    id,
    25,
    TIMESTAMP '2026-08-10 10:00:00'
FROM ipos
WHERE company_name = 'Nexa Consumer Products'

UNION ALL

SELECT
    id,
    32,
    TIMESTAMP '2026-08-11 10:00:00'
FROM ipos
WHERE company_name = 'Nexa Consumer Products'

UNION ALL

SELECT
    id,
    38,
    TIMESTAMP '2026-08-12 10:00:00'
FROM ipos
WHERE company_name = 'Nexa Consumer Products'

UNION ALL

SELECT
    id,
    42,
    TIMESTAMP '2026-08-13 10:00:00'
FROM ipos
WHERE company_name = 'Nexa Consumer Products';


-- Vertex Healthcare
INSERT INTO gmp_history
(
    ipo_id,
    gmp,
    recorded_at
)
SELECT
    id,
    70,
    TIMESTAMP '2026-08-04 10:00:00'
FROM ipos
WHERE company_name = 'Vertex Healthcare'

UNION ALL

SELECT
    id,
    82,
    TIMESTAMP '2026-08-05 10:00:00'
FROM ipos
WHERE company_name = 'Vertex Healthcare'

UNION ALL

SELECT
    id,
    95,
    TIMESTAMP '2026-08-06 10:00:00'
FROM ipos
WHERE company_name = 'Vertex Healthcare'

UNION ALL

SELECT
    id,
    110,
    TIMESTAMP '2026-08-07 10:00:00'
FROM ipos
WHERE company_name = 'Vertex Healthcare';