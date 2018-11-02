import { h } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getComicsQuery = gql`
  {
    serie(id: 1) {
      title
      comics {
        title
        nr
        owned
      }
    }
  }
`;

const Home = props => {
  const data = props.data;

  if (data.loading) {
    return <div class={style.home}>loading...</div>;
  } else {
    return (
      <div class={style.home}>
        <h1>{data.serie.title}</h1>
        <ol>
          {data.serie.comics.sort((a, b) => a.nr - b.nr).map(comic => {
            return (
              <li key={comic.id}>
                {comic.title} {comic.nr} - ({comic.owned})
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
};

export default graphql(getComicsQuery)(Home);
