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
  Alert,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import SearchResults from '../components/SearchResults';

const INITIAL_ALERT = {
  msg: '',
  type: 'primary',
  active: false,
};

export default function Search() {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState('user');
  const [typeShow, setTypeShow] = useState('');
  const [alertMsg, setAlertMsg] = useState(INITIAL_ALERT);

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
    if (searchValue.length <= 0) {
      setAlertMsg({
        msg: 'Arama terimi boş bırakılamaz',
        type: 'danger',
        active: true,
      });
      return;
    }
    const response = await fetch(
      `${process.env.API_URL}/common/search/${searchValue}/${type}`
    );
    setAlertMsg(INITIAL_ALERT);
    const data = await response.json();
    setData(data);
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12}>
            <h2>
              Arama Yapın <AiOutlineSearch color='red' />{' '}
            </h2>
            <p>
              Aşağıdaki bölümden kullanıcı, hashtag veya yerleri bulabilirsiniz.
              Instagram hesabınıza giriş yapmadan özgürce dolaşabilir ve
              insanları takip edebilirsiniz.
            </p>
            <Alert
              variant={alertMsg.type}
              show={alertMsg.active}
              onClose={() => setAlertMsg({ ...alertMsg, active: false })}
              dismissible
            >
              {alertMsg.msg}
            </Alert>
            <Form className='w-100' onSubmit={onSubmit}>
              <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <AiOutlineArrowRight />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder='Arama kelimesi...'
                  aria-label='Arama kelimesi...'
                  aria-describedby='basic-addon2'
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
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
                  <Button variant='outline-success' type='submit'>
                    Ara
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        {data && <SearchResults data={data} type={type} />}
      </Container>
    </Layout>
  );
}
