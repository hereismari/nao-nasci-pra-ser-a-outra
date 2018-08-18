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
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint,
  DiscreteColorLegend 
} from 'react-vis';


const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    alignItems: 'center',
    padding: '2px'
  };
const boxStyle = {height: '2px', width: '2px'};
function buildValue(value) {
    return value
  }

const dados = [
    {x: 1, y: 10, size: 30, partido: "pt"},    
    {x: 1.7, y: 12, size: 10, partido: "pmdb"},
    {x: 2, y: 5, size: 1, partido: "novo"},
    {x: 3, y: 15, size: 12, partido: "PSOL"},
    {x: 2.5, y: 7, size: 4, partido: "arena"}
]

export default class VotosVSInvestimentos extends React.Component {
    state = {
        value: false
      }
    render() {
        return (
        <XYPlot
            width={300}
            height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            opacity="0.8"
            sizeRange={[5, 15]}
            data={dados}
            onValueClick={e => console.log(e)}
            onValueMouseOver={v =>  this.setState({value: v.x && v.y ? v: false})  }
            onSeriesMouseOut={() => this.setState({value: false})}
            >
            
            
            </MarkSeries>  
            {this.state.value ? <Hint value={buildValue(this.state.value)}>
                <div style={tipStyle}>
                    <div style={{...boxStyle}}/>                    
                    {this.state.value.partido}
                        
                </div>
            </ Hint> : null}
        </XYPlot>
        );
    }
}