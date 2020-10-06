import Layout from '../components/Layout';
import {
  Container,
  Row,
  InputGroup,
  Button,
  FormControl,
  Col,
  Form,
  DropdownButton,
  Dropdown,
  Badge,
} from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Search() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState('');
  const [type, setType] = useState('user');
  const [typeShow, setTypeShow] = useState('');

  useEffect(() => {
    switch (type) {
      case 'user':
        setTypeShow('Kullanıcı');
        break;
      case 'hashtag':
        setTypeShow('Hashtag');
        break;
      case 'place':
        setTypeShow('Yerler');
        break;
    }
  }, [type]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.API_URL}/common/search/${username}/${type}`
    );
    const data = await response.json();
    setData(data);
    console.log(data);
  };

  return (
    <Layout>
      <Container>
        <Row>
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
            dicta dignissimos fugit incidunt, inventore nostrum totam unde
            voluptatibus? Amet beatae cum dignissimos dolore ex laboriosam odio
            officia quae repellendus rerum!
          </p>
          <Form className='w-100' onSubmit={onSubmit}>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder='Instagram username'
                aria-label='Instagram username'
                aria-describedby='basic-addon2'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <DropdownButton
                as={InputGroup.Append}
                variant='outline-secondary'
                title={typeShow}
                id='input-group-dropdown-2'
              >
                <Dropdown.Item onSelect={() => setType('user')}>
                  Kullanıcı
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => setType('hashtag')}>
                  Hashtag
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => setType('place')}>
                  Yer
                </Dropdown.Item>
              </DropdownButton>
              <InputGroup.Append>
                <Button variant='outline-secondary' type='submit'>
                  Ara
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        {data && (
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
                        <div className='result-username'>
                          @{user.user.username}
                        </div>
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
        )}
      </Container>
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
            width: 65px;
            height: 65px;
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
    </Layout>
  );
}
