function About() {
  return (
    <main className="container">
      <section className="panel about">
        <p className="eyebrow">ABOUT IPO PULSE</p>
        <h1>Understanding IPO data</h1>

        <h2>What is GMP?</h2>
        <p>
          Grey Market Premium (GMP) is an unofficial market indication of the
          premium at which an IPO may trade before listing. It is not an
          exchange-confirmed price and can change quickly.
        </p>

        <h2>How is estimated listing price calculated?</h2>
        <p>
          For this application, estimated listing price is calculated as:
        </p>

        <code>Issue Price + GMP</code>

        <h2>Important</h2>
        <p>
          The figures in the initial database are demonstration data. Before
          using this application as a public financial information service,
          connect it to a reliable data source, add timestamps/source
          attribution, and clearly communicate that GMP is indicative.
        </p>
      </section>
    </main>
  );
}

export default About;
