import Layout from '../components/Layout';
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardDeck,
  Jumbotron,
} from 'react-bootstrap';
import Link from 'next/link';
import { RiSearchEyeLine } from 'react-icons/ri';

const Index = ({ followings }) => {
  console.log(followings);
  return (
    <Layout>
      <Container className='mb-4'>
        <Jumbotron style={{ padding: '4rem 2rem 1.5rem 2rem' }}>
          <h1 className='display-4'>Instagram Görüntüleyici</h1>
          <p className='lead'>
            Üye olmadan Instagram'da kolayca gezinin. Bu sayfada seçtiğimiz
            görseller görüntülenmektedir.
          </p>
          <hr className='my-4' />
          <p>
            Aşağıdaki butondan profillere, hashtaglere veya istediğiniz yerlere
            bakabilirsiniz.
          </p>
          <Link href='/search'>
            <a className='btn btn-warning'>
              Göz Atın <RiSearchEyeLine />
            </a>
          </Link>
        </Jumbotron>

        <CardDeck>
          <Card>
            <div className='text-center mt-2'>
              <Card.Img variant='top' src='heart.png' style={{ width: 64 }} />
            </div>
            <Card.Body className='text-center'>
              <Card.Title>Takip Edin</Card.Title>
              <Card.Text>
                Sevdiğiniz Instagram profillerini rahatça gezin ve bunu giriş
                yapmaya gerek kalmadan yapın.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className='text-center mt-2'>
              <Card.Img variant='top' src='picture.png' style={{ width: 64 }} />
            </div>
            <Card.Body className='text-center'>
              <Card.Title>Instagram Trendleri</Card.Title>
              <Card.Text>
                Instagram trendlerini tek bir yerden keşfedin.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className='text-center mt-2'>
              <Card.Img
                variant='top'
                src='detective.png'
                style={{ width: 64 }}
              />
            </div>
            <Card.Body className='text-center'>
              <Card.Title>Göz Atın</Card.Title>
              <Card.Text>
                Instagram hesabınıza giriş yapmadan istediğiniz kadar gizlice
                göz atın.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        <Row className='mt-2'>
          <Col md='12' className='mb-4 mt-4'>
            <h2 className='text-center'>Seçtiğimiz Profiller</h2>
          </Col>
          {followings.data.map((following) => (
            <Col md={3} sm={12} style={{ padding: 0 }}>
              <Link href={`/profile/${following.username}`}>
                <a>
                  <Card
                    className='w-50 mb-3 mx-auto'
                    style={{ border: 'none' }}
                  >
                    <Card.Img
                      variant='top'
                      src={following.profile_pic_url}
                      className='rounded-circle'
                    />
                    <Card.Body>
                      <Card.Text className='text-center'>
                        @{following.username.substr(0, 4)}..
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  let followings = {};
  try {
    const response = await fetch(`${process.env.API_URL}/users/user/me`);
    const data = await response.json();
    console.log(data.following);
    followings = data.following;
  } catch (err) {
    console.log(err.message);
    followings = {};
  }
  return {
    props: {
      followings,
    },
  };
}

export default Index;
