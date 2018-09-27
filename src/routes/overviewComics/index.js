import { h, Component } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getComicsQuery = gql`
  {
    allSeries {
      id
      title
      dbName
    }
  }
`;

class OverviewComics extends Component {
  render() {
    const data = this.props.data;

    if (data.loading) {
      return <div>loading...</div>;
    } else {
      return (
        <div class={style.profile}>
          <ol>
            {data.allSeries.sort((a, b) => a.title - b.title).map(serie => {
              return <h1>{serie.title}</h1>;
            })}
          </ol>
        </div>
      );
    }
  }
}

export default graphql(getComicsQuery)(OverviewComics);
