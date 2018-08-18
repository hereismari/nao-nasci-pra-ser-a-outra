// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  MarkSeries,
  Hint
} from 'react-vis';


const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    alignItems: 'right',
    padding: '2px'
  };

const boxStyle = {height: '2px', width: '2px'};


const dados = [
    {_id:{sigla_partido:"pt"},
        investimento: 1, 
        votos: 10, 
        n_mulheres: 30
    },
    {_id:{sigla_partido:"novo"},
        investimento: 10, 
        votos: 25, 
        n_mulheres: 12
    },
    {_id:{sigla_partido:"pmdb"},
        investimento: 4, 
        votos: 0, 
        n_mulheres: 65
    },
    {_id:{sigla_partido:"psol"},
        investimento: 104, 
        votos: 80, 
        n_mulheres: 5
    }
]

export default class VotosVSInvestimentos extends React.Component {
    state = {
        value: false,

      }
    render() {
        const {
            value
          } = this.state;
        
        const dataPlot = dados.map(elem => {
               return {
                    x: elem.investimento,
                    y: elem.votos,
                    partido: elem._id.sigla_partido,
                    size: elem.n_mulheres
                }
        });

        return (
            <div className="canvas-wrapper">
                    {<XYPlot
                        width={300}
                        height={300}>
                        <XAxis />
                        <YAxis />
                        <MarkSeries
                        className="mark-series-example"
                        strokeWidth={2}
                        opacity="0.8"
                        sizeRange={[5, 15]}
                        data={dataPlot}
                        onValueClick={e => console.log(e)}
                        onValueMouseOver={v =>  this.setState({value: v.x && v.y ? v: false})  }
                        onSeriesMouseOut={() => this.setState({value: false})}
                        >
            
                        </MarkSeries>  
                        {this.state.value ? <Hint value={this.state.value}>
                            <div style={tipStyle}>
                                <div style={{...boxStyle}}/>                    
                                Partido {this.state.value.partido} com investimento de <br/>
                                {this.state.value.x} milhões <br/>
                                e {this.state.value.y} mil votos em {this.state.value.size} <br/>
                                mulheres do partido.  
                            </div>
                        </ Hint> : null}
                        
                    </XYPlot>}
            </div>
        );
    }
}