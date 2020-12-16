import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { connect } from 'react-redux';
import '../../App.css';

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentData: null,
            practicalData: null
        }

        this.options = this.getLightTheme();
    }

    componentDidMount(){
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
            console.log(count)
            this.setState({
                assessmentData: {
                    labels: Object.keys(count.assessment),
                    datasets: [
                        {
                            label: 'Frequency BarGraph for '+this.props.activeClass+' Assessment Marks',
                            backgroundColor: '#42A5F5',
                            data: Object.values(count.assessment)
                        }
                    ]
                },
                practicalData: {
                    labels: Object.keys(count.practical),
                    datasets: [
                        {
                            label: 'Frequency BarGraph for '+this.props.activeClass+' Practical Marks',
                            backgroundColor: '#42A5F5',
                            data: Object.values(count.practical)
                        }
                    ]
                }
            })
        }
    }

    getLightTheme() {
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
                        fontColor: '#495057'
                    }
                }]
            }
        };
    }

    render() {
        const basicOptions = this.options;
        return (
            <div className='p-grid p-lg-12 fixedBar'>
                <div className="card p-col-12" style={{padding: '25px'}}>
                    <Chart type="bar" data={this.state.assessmentData} options={basicOptions} />
                </div>
                <div className="card" style={{padding: '25px'}}>
                    <Chart type="bar" data={this.state.practicalData} options={basicOptions} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeClass: state.teacher.activeClass,
        classStudentValues: state.teacher.classStudentValues,
        classIndex: state.teacher.activeClassStudentValuesIndex
    };
};

export default connect( mapStateToProps, )( BarChart );
