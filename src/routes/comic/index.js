import { h, Component } from 'preact';
import style from './style';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import styled from 'styled-components';

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

const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  line-height: 2rem;
  font-size: 1.5rem;
  color: #333;
  padding-left: 10px;
`;

const ComicDiv = styled.div`
  margin-top: 1.1rem;
  //outline: 1px solid green;
  padding: 1rem;
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
            if (loading) return null;
            if (error) return `Error!: ${error}`;

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
                      <ComicDiv key={comic.nr}>
                        {comic.nr} {comic.title}
                      </ComicDiv>
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
