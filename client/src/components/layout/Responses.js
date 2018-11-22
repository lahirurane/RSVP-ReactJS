import React, { Component } from 'react';
import axios from 'axios';

export default class Responses extends Component {
  constructor() {
    super();
    this.state = {
      errors_hc: {},
      errors_wedding: {},
      data_hc: null,
      data_wedding: null,
      loading_hc: false,
      loading_wedding: false
    };

    this.getResponses = this.getResponses.bind(this);
  }
  componentDidMount() {
    this.getResponses();
  }

  getResponses() {
    this.setState({
      loading_hc: true,
      loading_wedding: true,
      errors_hc: {},
      errors_wedding: {}
    });
    axios
      .get(`/api/rsvp/getResponses/home_coming`)
      .then(res => {
        this.setState({ loading_hc: false, data_hc: res.data });
      })
      .catch(err => {
        this.setState({ loading_hc: false, errors_hc: err.response.data });
      });

    axios
      .get(`/api/rsvp/getResponses/wedding`)
      .then(res => {
        console.log('Success', res);
        this.setState({
          loading_wedding: false,
          data_wedding: res.data
        });
      })
      .catch(err => {
        console.log('error', err);
        this.setState({
          loading_wedding: false,
          errors_wedding: err.response ? err.response.data : ''
        });
      });
  }
  render() {
    let totalW = 0;
    let totalHc = 0;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              className="col-md-12"
            >
              <div className="row">
                <div className="col-md-12">
                  <h2>Wedding</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-2">
                  <h4>Name</h4>
                </div>
                <div className="col-md-4">
                  <h4>Attending</h4>
                </div>
              </div>
              {this.state.data_wedding
                ? this.state.data_wedding.map(item => {
                    if (item.isAccepted) {
                      ++totalW;
                    }
                    return (
                      <div className="row">
                        <div className="col-md-4 col-md-offset-2">
                          {item.name}
                        </div>
                        <div className="col-md-4">
                          {item.isAccepted ? 'True' : 'False'}
                        </div>
                      </div>
                    );
                  })
                : ''}
              <hr />
              <div className="row">
                <div className="col-md-4 col-md-offset-2">
                  <h4>Total Wedding Attendence</h4>
                </div>
                <div className="col-md-4">
                  <h4>{totalW}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-2">
                  <p>Total Wedding Responses</p>
                </div>
                <div className="col-md-4">
                  <p>
                    {this.state.data_wedding
                      ? this.state.data_wedding.length
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">&nbsp;&nbsp;</div>
          <div className="row">&nbsp;&nbsp;</div>
          <div className="row">&nbsp;&nbsp;</div>
          <div className="row">
            <div
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              className="col-md-12"
            >
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h2>Home Coming</h2>
                  </div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row">&nbsp;</div>
                <div className="row">
                  <div className="col-md-4 col-md-offset-2">
                    <h4>Name</h4>
                  </div>
                  <div className="col-md-4">
                    <h4>Attending</h4>
                  </div>
                </div>
                {this.state.data_hc
                  ? this.state.data_hc.map(item => {
                      if (item.isAccepted) {
                        ++totalHc;
                      }
                      return (
                        <div className="row">
                          <div className="col-md-4 col-md-offset-2">
                            {item.name}
                          </div>
                          <div className="col-md-4">
                            {item.isAccepted ? 'True' : 'False'}
                          </div>
                        </div>
                      );
                    })
                  : ''}
                <hr />
                <div className="row">
                  <div className="col-md-4 col-md-offset-2">
                    <h4>Total Home Coming Attendence</h4>
                  </div>
                  <div className="col-md-4">
                    <h4>{totalHc}</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-md-offset-2">
                    <p>Total Home Coming Responses</p>
                  </div>
                  <div className="col-md-4">
                    <p>{this.state.data_hc ? this.state.data_hc.length : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
