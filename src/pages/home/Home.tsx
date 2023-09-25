import Hero from './Hero';
import Page from '../../components/Page';

function Welcome() {
  return (
    <Page className="flex flex-col">
      <Hero />
      <section className="py-8 flex flex-col items-center">
        <h2>Daily Deals</h2>
      </section>
    </Page>
  );
}

export default Welcome;
