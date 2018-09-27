import { h } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_COMIC = gql`
  query Comic($comicid: Int!) {
    serie(id: $comicid) {
      title
      comics {
        nr
        title
      }
    }
  }
`;

const Comic = ({ comicid }) => {
  return (
    <div class={style.home}>
      <Query query={GET_COMIC} variables={{ comicid: parseInt(comicid) }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          return (
            <ol>
              {data.serie.comics.sort((a, b) => a.nr - b.nr).map(comic => {
                return (
                  <li key={comic.id}>
                    {comic.title} {comic.nr}
                  </li>
                );
              })}
            </ol>
          );
        }}
      </Query>
    </div>
  );
};

export default Comic;
