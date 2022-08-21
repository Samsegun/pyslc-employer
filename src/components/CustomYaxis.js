const CustomYaxis = () => {
    return (
        <div
            className='y-axis-wrapper'
            style={{
                background: "#fff",
                position: "sticky",
                left: 0,
                zIndex: 1003,
            }}>
            <svg width='70' height='90%' viewBox='5 0 56 420'>
                <g className='recharts-layer recharts-cartesian-axis recharts-yAxis yAxis'>
                    <line
                        orientation='left'
                        width='60'
                        height='346'
                        type='number'
                        x='-12'
                        y='10'
                        className='recharts-cartesian-axis-line'
                        stroke='#666'
                        fill='none'
                        x1='48'
                        y1='10'
                        x2='48'
                        y2='356'></line>
                    <g className='recharts-cartesian-axis-ticks'>
                        <g className='recharts-layer recharts-cartesian-axis-tick'>
                            <line
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='-12'
                                y='10'
                                className='recharts-cartesian-axis-tick-line'
                                stroke='#666'
                                fill='none'
                                x1='42'
                                y1='356'
                                x2='48'
                                y2='356'></line>
                            <text
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='40'
                                y='356'
                                stroke='none'
                                fill='#989898'
                                className='recharts-text recharts-cartesian-axis-tick-value'
                                text-anchor='end'>
                                <tspan x='40' dy='0.355em'>
                                    0
                                </tspan>
                            </text>
                        </g>
                        <g className='recharts-layer recharts-cartesian-axis-tick'>
                            <line
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='-12'
                                y='10'
                                className='recharts-cartesian-axis-tick-line'
                                stroke='#666'
                                fill='none'
                                x1='42'
                                y1='269.5'
                                x2='48'
                                y2='269.5'></line>
                            <text
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='40'
                                y='269.5'
                                stroke='none'
                                fill='#989898'
                                className='recharts-text recharts-cartesian-axis-tick-value'
                                text-anchor='end'>
                                <tspan x='40' dy='0.355em'>
                                    15000
                                </tspan>
                            </text>
                        </g>
                        <g className='recharts-layer recharts-cartesian-axis-tick'>
                            <line
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='-12'
                                y='10'
                                className='recharts-cartesian-axis-tick-line'
                                stroke='#666'
                                fill='none'
                                x1='42'
                                y1='183'
                                x2='48'
                                y2='183'></line>
                            <text
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='40'
                                y='183'
                                stroke='none'
                                fill='#989898'
                                className='recharts-text recharts-cartesian-axis-tick-value'
                                text-anchor='end'>
                                <tspan x='40' dy='0.355em'>
                                    30000
                                </tspan>
                            </text>
                        </g>
                        <g className='recharts-layer recharts-cartesian-axis-tick'>
                            <line
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='-12'
                                y='10'
                                className='recharts-cartesian-axis-tick-line'
                                stroke='#666'
                                fill='none'
                                x1='42'
                                y1='96.5'
                                x2='48'
                                y2='96.5'></line>
                            <text
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='40'
                                y='96.5'
                                stroke='none'
                                fill='#989898'
                                className='recharts-text recharts-cartesian-axis-tick-value'
                                text-anchor='end'>
                                <tspan x='40' dy='0.355em'>
                                    45000
                                </tspan>
                            </text>
                        </g>
                        <g className='recharts-layer recharts-cartesian-axis-tick'>
                            <line
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='-12'
                                y='10'
                                className='recharts-cartesian-axis-tick-line'
                                stroke='#666'
                                fill='none'
                                x1='42'
                                y1='10'
                                x2='48'
                                y2='10'></line>
                            <text
                                orientation='left'
                                width='60'
                                height='346'
                                type='number'
                                x='40'
                                y='12'
                                stroke='none'
                                fill='#989898'
                                className='recharts-text recharts-cartesian-axis-tick-value'
                                text-anchor='end'>
                                <tspan x='40' dy='0.355em'>
                                    60000
                                </tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default CustomYaxis;
