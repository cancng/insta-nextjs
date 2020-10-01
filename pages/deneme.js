import Link from 'next/link';
import Layout from '../components/Layout';
import { Container } from 'react-bootstrap';

const Deneme = () => {
  return (
    <Layout>
      <Container>
        <h2>Lorem ipsum.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis,
          tenetur!
        </p>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </Container>
    </Layout>
  );
};

export default Deneme;
