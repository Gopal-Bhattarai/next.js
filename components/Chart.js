import Chart from 'react-apexcharts'

const ChartTest = ({type}) => {
    const state = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        };

        
    
  return (
    <div>
      {(typeof window !== 'undefined') &&
        <Chart 
        options={state.options}
        series ={state.series}
        type={type} />
      }
    </div>
  )
}

export default ChartTest
