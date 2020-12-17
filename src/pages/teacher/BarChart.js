import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/teacher';
import '../../App.css';

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentData: null,
            practicalData: null,
            max: []
        }
    }

    componentDidMount(){
        if (this.props.activeClass === null)  this.props.setInfoBox({summary:"Info Message", detail: 'No Active Class Selected!!!'});
        if (this.props.classIndex !== null) {
            let data = this.props.classStudentValues[this.props.classIndex].data
            let count = { assessment : [], practical : []}
            for (let i = 0; i < data.length; i++) {
                let aval = data[i].theory_marks
                let pval = data[i].practical_marks
                if (count.assessment.hasOwnProperty(aval)){
                    count.assessment[`${aval}`] += 1
                } else {
                    count.assessment[`${aval}`] = 1
                }
                if (count.practical.hasOwnProperty(pval)){
                    count.practical[`${pval}`] += 1
                } else {
                    count.practical[`${pval}`] = 1
                }
            }
            this.setState({
                assessmentData: {
                    labels: Object.keys(count.assessment),
                    datasets: [
                        {
                            label: 'Frequency of Assessment Marks',
                            backgroundColor: '#42A5F5',
                            data: Object.values(count.assessment)
                        }
                    ]
                },
                practicalData: {
                    labels: Object.keys(count.practical),
                    datasets: [
                        {
                            label: 'Frequency of Practical Marks',
                            backgroundColor: '#42A5F5',
                            data: Object.values(count.practical)
                        }
                    ]
                },
                max: [Math.max(...Object.values(count.assessment)), Math.max(...Object.values(count.practical))]
            })
        }
    }

    getOption(max) {
        console.log(max)
        return {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: max,
                        fontColor: '#495057'
                    }
                }]
            }
        }
    };

    render() {
        return (
            <div>
                {this.props.infoBox ? <Redirect to='/'/> : null}
                <h1 style={{color: '#1E90FF'}}>{this.props.sectionSubject[0]} Assessment Marks</h1>
                <div className="card" style={{padding: '25px'}}>
                    <Chart type="bar" data={this.state.assessmentData} options={this.getOption(this.state.max[0]+1)} />
                </div><hr/>
                <h1 style={{color: '#1E90FF'}}>{this.props.sectionSubject[0]} Practical Marks</h1>
                <div className="card" style={{padding: '25px'}}>
                    <Chart type="bar" data={this.state.practicalData} options={this.getOption(this.state.max[1]+1)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeClass: state.teacher.activeClass,
        classStudentValues: state.teacher.classStudentValues,
        classIndex: state.teacher.activeClassStudentValuesIndex,
        sectionSubject: state.teacher.activeSectionSubject,
        infoBox: state.teacher.infoBox
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInfoBox: (value) => dispatch( actions.setInfoBox(value) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps)( BarChart );
