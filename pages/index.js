import Layout from '../components/Layout';
import {
  Container,
  Row,
  InputGroup,
  Button,
  FormControl,
  Col,
  Form,
} from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';

export default function Index() {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState('');

  const onSubmit = async (e) => {
    const response = await fetch(
      `https://test-instapi.herokuapp.com/api/common/search/${username}/user`
    );
    const data = await response.json();
    setUsers(data);
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
          <Form className='w-100'>
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
              <InputGroup.Append>
                <Button variant='outline-secondary' onClick={onSubmit}>
                  Kullanıcı ara
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        {users && (
          <Row>
            <Col>
              <h2>Sonuçlar</h2>
              {users.users.map((user) => (
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
        `}
      </style>
    </Layout>
  );
}
