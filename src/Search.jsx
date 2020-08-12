import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const SearchBar = styled.div`
  position: absolute;
  top: ${props => (props.hasSearchValues ? '0%' : '50%')};
  ${props => (!props.hasSearchValues ? 'transform: translateY(-50%);' : null)}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding-top: 120px;
  align-items: center;
`

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cmc: '',
      colorIdentity: [],
      colors: [],
      id: '',
      img: '',
      name: '',
      oracleText: '',
      price: '',
      priceF: '',
      search: '',
      affiliate: '',
    }
  }
  addToAll = () => {
    let body = new FormData()
    body.append('username', this.props.username)
    body.append('id', this.state.id)
    body.append('coloridentity', this.state.colorIdentity)
    body.append('cmc', this.state.cmc)
    body.append('colors', this.state.colors)
    body.append('img', this.state.img)
    body.append('name', this.state.name)
    body.append('oracletext', this.state.oracleText)
    body.append('price', this.state.price)
    body.append('pricef', this.state.priceF)
    body.append('affiliate', this.state.affiliate)
    fetch('/add-to-all', { method: 'POST', body })
  }
  addCollection = () => {
    let body = new FormData()
    body.append('username', this.props.username)
    body.append('id', this.state.id)
    body.append('coloridentity', this.state.colorIdentity)
    body.append('colors', this.state.colors)
    body.append('img', this.state.img)
    body.append('name', this.state.name)
    body.append('oracletext', this.state.oracleText)
    body.append('price', this.state.price)
    body.append('pricef', this.state.priceF)
    body.append('affiliate', this.state.affiliate)
    fetch('/add-card-to-collection', { method: 'POST', body })
  }
  clickHandler = () => {
    fetch('https://api.scryfall.com/cards/named?fuzzy=' + this.state.search)
      .then(res => res.json())
      .then(json => {
        let searchResults = json
        console.log(searchResults)
        let img = searchResults.image_uris.normal
        let price = searchResults.prices.usd
        let priceF = searchResults.prices.usd_foil
        let oracleText = searchResults.oracle_text
        let cmc = searchResults.cmc
        let colorIdentity = searchResults.color_identity
        let colors = searchResults.colors
        let id = searchResults.id
        let name = searchResults.name
        let affiliate = searchResults.purchase_uris.cardmarket
        this.setState({ name })
        this.setState({ img })
        this.setState({ price })
        this.setState({ priceF })
        this.setState({ oracleText })
        this.setState({ cmc })
        this.setState({ colorIdentity })
        this.setState({ colors })
        this.setState({ id })
        this.setState({ affiliate })
        this.addToAll()
      })
  }
  render = () => {
    const hasSearchValues = !!this.state.img

    return (
      <Content>
        <SearchBar hasSearchValues={hasSearchValues}>
          <input
            type='text'
            placeholder='search for a card'
            value={this.state.search}
            onChange={event => {
              this.setState({ search: event.target.value })
            }}
          />
          <button onClick={this.clickHandler}>Search</button>
        </SearchBar>
        <CardContainer>
          {hasSearchValues && (
            <>
              <Link to={'/CardDetails/' + this.state.id} onClick={this.addToAll}>
                <img src={this.state.img} height='400px' />
              </Link>
              <div>Name: {this.state.name}</div>
              <div>
                Price:
                {this.state.price === null ? ' Currently Unavailable' : this.state.price + '$ USD'}
              </div>
              <div>
                Foil Price:
                {this.state.priceF === null
                  ? ' Currently Unavailable'
                  : this.state.priceF + '$ USD'}
              </div>
              <a href={this.state.affiliate}>Purchase from our affiliate </a>
              <div></div>
              {this.state.loggedIn && (
                <button onClick={this.addCollection}>Add to my collection</button>
              )}
            </>
          )}
        </CardContainer>
      </Content>
    )
  }
}
let mapStateToProps = state => {
  return { username: state.username, state }
}
let Search = connect(mapStateToProps)(UnconnectedSearch)
export default Search
