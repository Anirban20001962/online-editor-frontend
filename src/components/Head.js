import { Helmet } from 'react-helmet';

const Head = ({ title, description }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title || `Snippetor`}</title>
            <link rel="canonical" href="https://ranjan.netstorm.in" />
            <meta property="og:type" content="webpage" />
            <meta property="og:title" content={title || `Snippetor`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="https://ranjan.netstorm.in" />
            <meta property="og:site_name" content="ranjan.netstorm.in" />
        </Helmet>
    );
};

export default Head;
