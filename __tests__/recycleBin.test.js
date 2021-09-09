import { mount, createLocalVue } from '@vue/test-utils'
import RecycleBin from './../src/views/RecycleBin.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('RecycleBin Component unit tests: ', () => {

    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    test('Displayed message about empty Recycle Bin', () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify})
        expect(wrapper.html()).toContain("Recycle Bin is empty")
    })

    test('Displayed documents list', async () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify})
        wrapper.setData({
            removedDocuments: [
                {name: "document1", date: "07.09.2021"},
                {name: "document2", date: "08.09.2021"},
                {name: "document3", date: "09.09.2021"}]
            })
        await wrapper.vm.$forceUpdate()
        expect(wrapper.html()).toContain("document1")
        expect(wrapper.html()).toContain("document2")
        expect(wrapper.html()).toContain("document3")
    })

    test('Restore document', async () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify
        })
        wrapper.setData({removedDocuments: [{name: "removedDocument", date: ""}]})
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#'+wrapper.vm.removedDocuments[0].name)
        const countFiles = wrapper.vm.removedDocuments.length
        button.trigger('click')
        expect(wrapper.vm.removedDocuments.length).toBe(countFiles-1)
    })

    test('Displated dialog after clicking Empty Recycle Bin', async () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify
        })
        wrapper.setData({
            removedDocuments: [
                {name: "document1", date: "07.09.2021"},
                {name: "document2", date: "08.09.2021"},
                {name: "document3", date: "09.09.2021"}]
            })
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#emptyRecycleBin')
        button.trigger('click')
        await wrapper.vm.$forceUpdate()
        expect(wrapper.html()).toContain("Confirm Deletion")
    })

    test('Empty Recycle Bin - NO', async () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify
        })
        wrapper.setData({
            removedDocuments: [
                {name: "document1", date: "07.09.2021"},
                {name: "document2", date: "08.09.2021"},
                {name: "document3", date: "09.09.2021"}]
            })
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#emptyRecycleBin')
        button.trigger('click')
        await wrapper.vm.$forceUpdate()
        const noButton = wrapper.find('#deletion-no-btn')
        noButton.trigger('click')
        await wrapper.vm.$forceUpdate()
        expect(wrapper.vm.removedDocuments.length).toBe(3)
    })

    test('Empty Recycle Bin - YES', async () => {
        const wrapper = mount(RecycleBin, {
            localVue,
            vuetify
        })
        wrapper.setData({
            removedDocuments: [
                {name: "document1", date: "07.09.2021"},
                {name: "document2", date: "08.09.2021"},
                {name: "document3", date: "09.09.2021"}]
            })
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#emptyRecycleBin')
        button.trigger('click')
        await wrapper.vm.$forceUpdate()
        const noButton = wrapper.find('#deletion-yes-btn')
        noButton.trigger('click')
        await wrapper.vm.$forceUpdate()
        expect(wrapper.vm.removedDocuments.length).toBe(0)
    })

 })



