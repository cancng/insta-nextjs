import Layout from '../../components/Layout';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import parse from 'html-react-parser';
import { BsLockFill } from 'react-icons/bs';
import Error from 'next/error';

const User = ({ user }) => {
  if (!user) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout title={`${user.user.username} instagram profili ve gönderileri`}>
      <Container>
        <Row>
          <Col md={4} xs={12}>
            <div>
              <div className='profile-avatar d-inline-block align-middle'>
                <img src={user.user.profile_pic_url_hd} alt='' width={100} />
              </div>
              <div className='profile-name d-inline-block align-middle'>
                <h1 className='profile-username'>{user.user.username}</h1>
                <h2 className='profile-name'>{user.user.full_name}</h2>
              </div>
            </div>
          </Col>
          <Col md={8} xs={12} className='text-center'>
            <div>{parse(user.user.biography)}</div>
            <div className='pt-3'>
              <ButtonGroup>
                <Button variant='primary' size='sm'>
                  <Badge variant='light'>
                    {user.user.edge_owner_to_timeline_media.count}
                  </Badge>{' '}
                  Gönderi
                  <span className='sr-only'>gönderi</span>
                </Button>
                <Button variant='secondary' size='sm'>
                  <Badge variant='light'>
                    {user.user.edge_followed_by.count}
                  </Badge>{' '}
                  Takipçi
                  <span className='sr-only'>gönderi</span>
                </Button>
                <Button variant='dark' size='sm'>
                  <Badge variant='light'>{user.user.edge_follow.count}</Badge>{' '}
                  Takip eden
                  <span className='sr-only'>gönderi</span>
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          {user.user.is_private && (
            <Col className='d-flex flex-column align-items-center'>
              <h2>Gizli</h2>
              <h4>
                <BsLockFill />
              </h4>
            </Col>
          )}
          {user.user.edge_owner_to_timeline_media.count === 0 && (
            <Col xl={12}>
              <Alert variant='danger' className='text-center'>
                Hiç gönderi yok!
              </Alert>
            </Col>
          )}
          {user.photos.edges.map((post) => (
            <Col md={4} xs={12}>
              <Card className='mb-3' style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  src={post.node.display_url}
                  style={{ height: '240px' }}
                />
                <Card.Body>
                  <Card.Title>
                    {post.node.__typename === 'GraphVideo' ? 'VIDEO' : 'IMG'}
                  </Card.Title>
                  <Card.Text>
                    {post.node.edge_media_to_caption.edges[0].node.text.substr(
                      0,
                      175
                    )}...
                  </Card.Text>
                  {/*<Button variant='primary'>Go somewhere</Button>*/}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <style jsx>{`
        .profile-avatar {
          width: 100px;
          height: 100px;
          overflow: hidden;
          -webkit-border-radius: 100%;
          border-radius: 100%;
          margin-right: 20px;
        }
        .profile-username {
          color: #222222;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        .profile-name {
          color: #888;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
        }
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let user = null;
  const { username } = context.query;
  try {
    const response = await fetch(`${process.env.API_URL}/users/${username}`);
    user = await response.json();
  } catch (err) {
    console.log(err.message);
    user = null;
  }
  return {
    props: { user },
  };
}

export default User;
