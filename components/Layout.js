import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import NavBar from './NavBar';

Router.events.on('routeChangeStart', (url) => {
  console.log('route değişimi başladı');
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  console.log('route değişimi bitti');
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  console.log('route değişiminde hata');
  NProgress.done();
});

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title || 'Instagram Görüntüleyici'}</title>
        <meta
          name='description'
          content={
            description ||
            "Instagram hikayeleri, profilleri, takipçileri ve takip edilenleri Instagram'a" +
              ' giriş yapmaya gerek kalmadan keşfetmeye başlayın.'
          }
        />
      </Head>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
