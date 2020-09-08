import React from 'react';

const API_URL = 'https://jsonmock.hackerrank.com/api/articles?page='

class Articles extends React.Component {
  state = {
    totalPages: 0,
    results: []
  }

  componentDidMount() {
    fetch(API_URL + '1')
    .then((res) => {
      return res.json()
    })
    .then((parsedData) => {
      const {total_pages} = parsedData;
      this.setState({
        totalPages:total_pages,
        results: parsedData.data
      })
      //console.log(parsedData.data + " " + this.state.totalPages+ " " )
    })
    .catch(err => {
      console.log(err)
    })
  }

  clickHandler = (num) => {
    fetch(API_URL + num)
    .then(res => res.json())
    .then(parsedData => {
      //console.log(parsedData);
      this.setState({
        results: parsedData.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  } 

  render() {
    let buttons = (
      Array(this.state.totalPages).fill().map((_, i) => (
        <button data-testid="page-button" 
        key={`page-button-${i + 1}`}
        onClick={() => this.clickHandler(i + 1)}>
            {i + 1}
        </button>
    ))
    )

    let list =(
      this.state.results.map((item, i) => {
      return !item.title ? null : <li key={`title-${i}`} data-testid="result-row">{item.title}</li>
      })
    )

    return (
      <React.Fragment>
        <div className="pagination">
          {buttons}
        </div>
        <ul className="results">
          {list}
        </ul>
      </React.Fragment>
    );
  }
}

export default Articles;
