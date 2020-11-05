import { Alert, Col, Container, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

const SearchResults = ({ data }) => {
  /*console.log('USERS LENGTH:: ', data.users.length);
  console.log('HASHTAG LENGTH:: ', data.hashtags.length);
  console.log('PLACES LENGTH:: ', data.places.length);*/
  console.log(data);
  if (
    data.users.users.length === 0 &&
    data.hashtag.hashtags.length === 0 &&
    data.places.places.length === 0
  ) {
    return (
      <Row>
        <Col className='text-center'>
          <Alert variant='danger'>No results</Alert>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <h2 className='mb-3'>Users</h2>
      <Row>
        {data.users.users.map((user) => (
          <Col md='3' xs='6' className='mb-4'>
            <Link href={`/profile/${user.user.username}`}>
              <a className='d-flex'>
                <div className='mr-4'>
                  <img
                    src={user.user.profile_pic_url}
                    className='img-fluid'
                    alt='instagram profile'
                    width={64}
                  />
                </div>
                <div className='align-self-center overflow-hidden'>
                  <span className='d-block'>
                    @{user.user.username}{' '}
                    {user.user.is_verified && (
                      <i className='fas fa-check-circle text-primary' />
                    )}
                  </span>
                  <span style={{ fontSize: 12 }}>{user.user.full_name}</span>
                </div>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
      <h2 className='mb-3'>Hashtags</h2>
      <Row>
        {data.hashtag.hashtags.map((hashtag) => (
          <Col md='3' xs='6' className='mb-4'>
            <Link href={`/hashtag/${hashtag.hashtag.name}`}>
              <a className='d-flex'>
                <div className='mr-4 d-flex align-items-center'>
                  <i className='fas fa-tag fa-2x text-secondary' />
                </div>
                <div className='align-self-center overflow-hidden'>
                  <span className='d-block'>#{hashtag.hashtag.name}</span>
                  <NumberFormat
                    value={hashtag.hashtag.media_count}
                    displayType='text'
                    thousandSeparator={true}
                  />{' '}
                  post
                </div>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
      <h2 className='mb-3'>Places</h2>
      {/*<Row>
        {data.places.places.map((place) => (
          <Col md='3' xs='6' className='mb-4'>
            <Link href={`/hashtag/${place.place.slug}`}>
              <a className='d-flex'>
                <div className='mr-4 d-flex align-items-center'>
                  <i className='fas fa-tag fa-2x text-secondary' />
                </div>
                <div className='align-self-center overflow-hidden'>
                  <span className='d-block'>#{place.place.title}</span>
                </div>
              </a>
            </Link>
          </Col>
        ))}
      </Row>*/}
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
};

export default SearchResults;
