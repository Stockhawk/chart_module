
import React from 'react';
import axios from 'axios';
import LineChartContainer from './LineChartContainer';
import TimeFilter from './TimeFilter';
import StockInfo from './StockInfo';
import CompanyInfo from './CompanyInfo';
import TagContainer from './TagContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from './api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: null,
      stockInfo: null,
      averageStock: null,
      changePercent: null,
      selectedFilter: 'day',
      currentPrice: null
    };
  }

  componentDidMount() {
  const stockId = window.location.pathname.split('/')[2];
  console.log('stock', stockId);
  axios.get(`/api/stocks/${stockId}`)
    .then(response => {
      let day = [];
      let week = [];
      let month = [];
      let threemonth = [];
      let year = [];
      let fiveyear = [];
      for (var i = 0; i < 107; i++){
        day.push(response.data[i].day);
        week.push(response.data[i].week);
        month.push(response.data[i].month);
        threemonth.push(response.data[i].threemonth);
        year.push(response.data[i].year);
        fiveyear.push(response.data[i].fiveyear);
      }
      this.setState({
        chartData: { day: day,
          week: week,
          month: month,
          threeMonth: threemonth,
          year: year,
          fiveYear: fiveyear
        },
        stockInfo: {
          relatedTags: ['hello', 'world'],
          stockCompany: response.data[0].stockcompany,
          noOfOwners: response.data[0].noofowners,
          recommendationPercent: response.data[0].recommendationpercent
        },
        averageStock: response.data[0].averagestock,
        changePercent: response.data[0].changepercent
      })
    })
    .catch(err => console.log(err));
  }

  // componentDidMount() {
  //   console.log('RESPONSE')
  //   const { stockId } = this.props.match ? this.props.match.params : { stockId: null };
  //   API.get((`/stocks/${stockId}`) || `/api/TSLA`)
  //   .then((response) => {
  //     this.setState({
  //       stockInfo: response.data[0].stockInfo,
  //       chartData: response.data[0].stockData,
  //       averageStock: response.data[0].averageStock,
  //       changePercent: response.data[0].changePercent
  //     })
  //   })
  // }

  changeSelectedFilter(e) {
    this.setState({
      selectedFilter: e.target.id
    })
  }

  changeCurrentPrice(activePoint) {
    this.setState({
      currentPrice: activePoint ? activePoint.price : null
    })
  }

  render() {
    const { chartData, stockInfo, averageStock, changePercent, selectedFilter, currentPrice } = this.state;
    return (
      <div id="stock-chart-container">
        {stockInfo && (<TagContainer tags={stockInfo.relatedTags} />)}

        {stockInfo && (
        <CompanyInfo 
          companyName={stockInfo.stockCompany} 
          noOfOwners={stockInfo.noOfOwners}
          recommendation={stockInfo.recommendationPercent} />
        )}

        {stockInfo && (
        <StockInfo 
        averageStock={averageStock}
        changePercent={changePercent}
        currentPrice={currentPrice} />)}

        {chartData && (
        <LineChartContainer 
        chart={chartData} 
        selectedChart={selectedFilter} 
        changePrice={price => this.changeCurrentPrice(price)} />
        )}

        <TimeFilter changeSelectedFilter={e => this.changeSelectedFilter(e)} />
      </div>
    );
  }
}

export default App;
