/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import { shallowMount } from '@vue/test-utils';
import Component from '@/blocks/collapse/collapse.vue';

Vue.use(ElementUI);
Vue.use(ams)

describe('collapse/collapse.vue', () => {
    let wrapper;
    let mockJson = {
        type: 'collapse',
        options: {
          collapseBlockA: 'blockA',
          collapseBlockB: 'blockB'
        },
        data: { 
          active: 'collapseBlockA' 
        },
        blocks: {
          collapseBlockA: {
            type: 'component',
            options: {
                is: 'div'
            }
          },
          collapseBlockB: {
            type: 'component',
            options: {
                is: 'div'
            }
          }
        }
    };
    beforeAll(() => {
        // 注册block
        ams.block('collapseMock', mockJson)

        // 挂载cardMock
        wrapper = shallowMount(Component, {
            propsData: {
                name: 'collapseMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        // 测试初始化数据是否符合预期
        expect(wrapper.vm.data.active).toBeDefined();
        expect(wrapper.vm.data.active).toBe('collapseBlockA');
    });

    it('collapse.vue的setBlockData方法', () => {
        // 测试setBlockData被触发后的后续行为符合预期
        wrapper.vm.setBlockData({active: 'bin'});
        expect(wrapper.vm.data.active).toBe('bin');

        // 利用mock函数测试事件会被正常触发
        let mockFn = jest.fn();
        wrapper.setMethods({ setBlockData: mockFn });
        wrapper.vm.setBlockData({active: 'bin'});
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith({active: 'bin'})
    });

    it('collapse.vue的options有效性', () => {
      expect(wrapper.vm.block.options).toBeDefined();
    });

    it('collapse.vue的props属性', () => {
        // 测试props的name是否符合预期
        expect(wrapper.props().name).toBe('collapseMock');
        // props name数据规则验证
        const name = wrapper.vm.$options.props.name;
        expect(name.type).toBe(String)
        expect(name.default).toBe('')
        expect(name.required).toBeTruthy()
    });
});
