import { Heatmap } from '@ant-design/plots';

const DependencyMap = ({dependencies}) => {
    const data = dependencies;
    const config = {
        data,
        xField: 'file1',
        yField: 'file2',
        colorField: 'dependency',
        opacity: 0.8,
        tooltip: {
            fields: ['file1', 'file2', 'dependency'],
          }
        // type:'desity',
        // meta: {
        //   'file1': {
        //     type: 'cat',
        //   },
        //   'file2' : {
        //     type: 'cat',
        //   }
        // },
      };
    
    return (
        <Heatmap {...config}/>
    )
}

export default DependencyMap;