import { Heatmap } from '@ant-design/plots';

const DependencyMap = ({dependencies}) => {
    const data = dependencies;
    const config = {
        width: 500,
        height: 500,
        data,
        xField: 'file1',
        yField: 'file2',
        colorField: 'dependency',
        opacity: 0.8,
        tooltip: {
            fields: ['file1', 'file2', 'dependency'],
            showTitle: false,
        },
        axis: {
            label: {
                autoRotate: true,
            },
        },
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