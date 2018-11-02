import { h, Component } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

const getComicsQuery = gql`
  {
    allSeries {
      id
      title
      dbName
    }
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class OverviewComics extends Component {
  render() {
    const data = this.props.data;

    if (data.loading) {
      return (
        <CenteredDiv class={style.loading}>
          loading... <p class={style.loader} />
        </CenteredDiv>
      );
    } else {
      return (
        <div class={style.profile}>
          <ol>
            {data.allSeries.sort((a, b) => a.title - b.title).map(serie => {
              return (
                <h1>
                  <Link href={`/comic/${serie.id}`}>{serie.title}</Link>
                </h1>
              );
            })}
          </ol>
        </div>
      );
    }
  }
}

export default graphql(getComicsQuery)(OverviewComics);
