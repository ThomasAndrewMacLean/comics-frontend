import { h, Component } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import ComicListItem from './../../components/ComicListItem';
import styled from 'styled-components';

const GET_COMIC = gql`
  query Comic($comicid: Int!) {
    serie(id: $comicid) {
      title
      dbName
      comics {
        nr
        title
        owned
        _id
      }
    }
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  line-height: 2rem;
  font-size: 1.5rem;
  color: #333;
  padding-left: 10px;
`;

const ComicList = styled.div`
  margin: 1rem;
`;

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    //this.handleChange.bind(this);
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    const comicid = this.props.comicid;
    const search = this.state.search;
    return (
      <div class={style.home}>
        <Input type='text' onChange={this.handleSearch} value={search} />
        <Query query={GET_COMIC} variables={{ comicid: parseInt(comicid) }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <CenteredDiv>
                  loading... <p class={style.loader} />
                </CenteredDiv>
              );
            }
            if (error) {
              return <CenteredDiv>Error!: {error}</CenteredDiv>;
            }

            return (
              <ComicList>
                {data.serie.comics
                  .filter(comic =>
                    (comic.title + comic.nr)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .sort((a, b) => a.nr - b.nr)
                  .map(comic => {
                    return (
                      <ComicListItem
                        comic={comic}
                        serie={data.serie}
                        key={comic.nr}
                      />
                    );
                  })}
              </ComicList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Comic;
