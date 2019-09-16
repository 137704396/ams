export default {
	colorField1: {
		type: 'form',
		resource: {
			fields: {
				colorFieldA: {
					type: 'color',
					label: '颜色'
				},
				colorFieldB: {
					type: 'color',
					default: '#f60',
					label: '带默认值'
				},
				colorFieldC: {
					type: 'color',
					default: '#f90',
					label: '纯展示',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
