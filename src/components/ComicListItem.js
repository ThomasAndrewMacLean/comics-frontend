import { h, Component } from 'preact';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

const TOGGLE_OWNED = gql`
  mutation ToggleOwned($serie: String!, $comicid: String!, $owned: Boolean!) {
    toggleOwned(serie: $serie, comicid: $comicid, owned: $owned)
  }
`;

const ComicDiv = styled.div`
  margin-top: 1.1rem;

  ${({ owned }) =>
    owned &&
    `
    background:rgba(103,58,183,0.3)
  `};
`;

const BigButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  height: 100%;
  width: 100%;
  padding: 1rem;
  font-family: inherit;
  font-size: inherit;
  text-align: left;

  :active {
    // outline: 1px solid green;
  }
  :hover {
    // outline: 1px solid green;
  }
  :focus {
    //outline: 1px solid green;
  }
`;

class ComicListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: props.comic.owned
    };
    //this.handleChange.bind(this);
  }

  render() {
    const { comic, serie } = this.props;
    const { owned } = this.state;
    return (
      <ComicDiv key={comic.nr} owned={owned}>
        <Mutation mutation={TOGGLE_OWNED}>
          {(toggleOwned, { error }) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  toggleOwned({
                    variables: {
                      serie: serie.dbName,
                      comicid: comic._id,
                      owned: !owned
                    }
                  });
                  this.setState({ owned: !owned });
                }}
              >
                <BigButton type='submit'>
                  {comic.nr} {comic.title}
                </BigButton>
              </form>
              {error && <p>Error :( Please try again</p>}
            </div>
          )}
        </Mutation>
      </ComicDiv>
    );
  }
}

export default ComicListItem;
