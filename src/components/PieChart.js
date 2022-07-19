import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const PieChart = ({data = []}) => {
    const config = {
        appendPadding: 10,
        data,
        angleField: 'commit_count',
        colorField: 'author_name',
        radius: 0.8,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{percentage}',
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
      return <Pie {...config} />;
}

export default PieChart;