import Layout from '../../components/Layout';

import { Card, Col, Container, Row } from 'react-bootstrap';
import Error from 'next/error';

const Hashtag = ({ hashtagData }) => {
  if (!hashtagData) {
    return <Error statusCode={404} />;
  }
  console.log('hashtagData', hashtagData);
  return (
    <Layout
      title={`#${hashtagData.hashtag.name} etiketine ait resim ve videolar`}
      description={`#${hashtagData.hashtag.name} etiketine ait resim ve videolar. #${hashtagData.hashtag.name} etiketini keşfetmeye başlayın`}
    >
      <Container>
        <Row>
          <Col md={4} sm={12}>
            <Row>
              <Col>
                <img
                  src={hashtagData.hashtag.profile_pic_url}
                  className='rounded-circle'
                  alt={hashtagData.hashtag.name}
                  width={64}
                />
              </Col>
              <Col className='d-flex flex-column align-items-center justify-content-center'>
                <h3>#{hashtagData.hashtag.name}</h3>
                {hashtagData.hashtag.edge_hashtag_to_media.count} gönderi
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Row>
              <Col className='mb-3'>
                <h2 className='text-center text-info'>
                  #{hashtagData.hashtag.name} etiketinde en iyi gönderiler
                </h2>
              </Col>
            </Row>
            <Row>
              {hashtagData.hashtag.edge_hashtag_to_top_posts.edges.map(
                (post) => (
                  <Col md={4} xs={12}>
                    <Card className='mb-3' style={{ width: '18rem' }}>
                      <Card.Img
                        variant='top'
                        src={post.node.display_url}
                        style={{ height: '240px' }}
                      />
                      <Card.Body>
                        <Card.Title>
                          {post.node.__typename === 'GraphVideo'
                            ? 'VIDEO'
                            : 'IMG'}
                        </Card.Title>
                        <Card.Text>
                          {post.node.edge_media_to_caption.edges[0].node.text.substr(
                            0,
                            175
                          )}
                          ...
                        </Card.Text>
                        {/*<Button variant='primary'>Go somewhere</Button>*/}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let hashtagData = null;
  const { hashtag } = context.query;
  try {
    const response = await fetch(`${process.env.API_URL}/hashtag/${hashtag}`);
    hashtagData = await response.json();
  } catch (err) {
    console.log(err.message);
    hashtagData = null;
  }

  return {
    props: {
      hashtagData,
    },
  };
}

export default Hashtag;
