import { Alert, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

const SearchResults = ({ data, type }) => {
  console.log('USERS LENGTH:: ', data.users.length);
  console.log('HASHTAG LENGTH:: ', data.hashtags.length);
  console.log('PLACES LENGTH:: ', data.places.length);
  if (
    data.users.length === 0 &&
    data.hashtags.length === 0 &&
    data.places.length === 0
  ) {
    return (
      <Row>
        <Col className='text-center'>
          <Alert variant='danger'>Sonuç bulunamadı</Alert>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row>
        <Col className='text-center'>
          <h2 className=''>Sonuçlar</h2>
          {type === 'user' &&
            data.users.map((user) => (
              <div className='profile-result'>
                <Link href={`/profile/${user.user.username}`}>
                  <a>
                    <div className='result-ava'>
                      <img
                        src={user.user.profile_pic_url}
                        alt={user.user.username}
                      />
                    </div>
                    <div className='result-username'>@{user.user.username}</div>
                  </a>
                </Link>
              </div>
            ))}
          <div className='hashtag-results'>
            {type === 'hashtag' &&
              data.hashtags.map((hashtag) => (
                <Link href={`/hashtag/${hashtag.hashtag.name}`}>
                  <a className='mr-3 mb-3'>#{hashtag.hashtag.name}</a>
                </Link>
              ))}
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .profile-result {
            width: 150px;
            margin: 0 8px 35px;
            text-align: center;
            display: inline-block;
            vertical-align: top;
          }
          .result-ava {
            width: 150px;
            height: 150px;
            background-color: rgba(255, 91, 38, 0.96);
            overflow: hidden;
            -webkit-border-radius: 100%;
            border-radius: 100%;
            display: inline-block;
            //margin-bottom: 20px;
          }
          .result-username {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #222222;
            font-size: 24px;
          }
          .hashtag-results {
            display: block;
          }
          .hashtag-results a {
            display: inline-block;
            padding: 10px 22px;
            background: #fff;
            color: #222222;
            font-size: 17px;
            margin: 0 8px 20px;
            max-width: 290px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-radius: 22px;
            border: 1px solid #ebebeb;
          }
        `}
      </style>
    </>
  );
};

export default SearchResults;
