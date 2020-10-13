import React from 'react';
import Layout from '../../components/Layout';
import {
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FaClock, FaComment, FaHeart, FaThumbsUp } from 'react-icons/fa';
import Link from 'next/link';
import Moment from 'react-moment';
import 'moment/locale/tr';

const Shortcode = ({ media }) => {
  console.log(media);
  return (
    <Layout
      title={`${media.owner.full_name} Instagramda: ${media.edge_media_to_caption.edges[0].node.text}`}
      description={`${media.accessibility_caption} Instagramda takip edin: ${media.edge_media_to_caption.edges[0].node.text}`}
    >
      <Container className='mb-4'>
        <Row className='mb-3'>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
            <div>
              <h1>{media.owner.username} gönderisi</h1>
            </div>
            <div>
              <div>
                <FaHeart className='mr-1 text-danger' />
                {media.edge_media_preview_like.count} beğeni
              </div>
              <div>
                <FaComment className='mr-1 text-info' />
                {media.edge_media_preview_comment.count} yorum
              </div>
              <div>
                <FaClock className='mr-1' />
                <Moment unix fromNow locale='tr'>
                  {media.taken_at_timestamp}
                </Moment>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: '6', offset: '3' }}>
            <Card>
              <Carousel>
                {media.__typename === 'GraphSidecar' ? (
                  media.edge_sidecar_to_children.edges.map((sidecarMedia) =>
                    sidecarMedia.node.__typename === 'GraphImage' ? (
                      <Carousel.Item>
                        <img
                          className='d-block w-100'
                          src={sidecarMedia.node.display_url}
                          alt='First slide'
                        />
                      </Carousel.Item>
                    ) : (
                      <video src={sidecarMedia.node.video_url} controls />
                    )
                  )
                ) : media.__typename === 'GraphImage' ? (
                  <Card.Img variant='top' src={media.display_url} />
                ) : (
                  <video src={media.video_url} controls />
                )}
              </Carousel>
              <Card.Body>
                <Card.Title>@{media.owner.username}</Card.Title>
                <Card.Text>
                  {media.edge_media_to_caption.edges[0].node.text}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <ListGroup>
                  {media.edge_media_to_parent_comment.edges.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column justify-content-center mr-3'>
                          <Link
                            href={`/profile/${comment.node.owner.username}`}
                          >
                            <a>@{comment.node.owner.username.substr(0, 4)}..</a>
                          </Link>
                          <img
                            className='rounded-circle'
                            src={comment.node.owner.profile_pic_url}
                            alt='profile picture'
                            width='64px'
                          />
                          <span className='align-self-center'>
                            <FaThumbsUp className='text-secondary' />{' '}
                            {comment.node.edge_liked_by.count}
                          </span>
                        </div>
                        <div className='overflow-hidden'>
                          {comment.node.text}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let media = null;
  const { shortcode } = context.query;
  try {
    const response = await fetch(
      `${process.env.API_URL}/common/media/${shortcode}`
    );
    media = await response.json();
  } catch (err) {
    console.log(err.message);
    media = null;
  }
  return {
    props: {
      media,
    },
  };
}

export default Shortcode;
