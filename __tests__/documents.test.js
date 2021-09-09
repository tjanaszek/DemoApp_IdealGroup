import { mount,  createLocalVue } from '@vue/test-utils'
import Documents from './../src/views/Documents.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

describe('Documents Component unit tests: ', () => {

    const localVue = createLocalVue()
    let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('Displayed message about empty documents list', () => {
    const wrapper = mount(Documents, {
        localVue,
        vuetify})
    expect(wrapper.html()).toContain("No documents here")
})

  test('Displayed documents list', async () => {
    const wrapper = mount(Documents, {
        localVue,
        vuetify})
    wrapper.setData({
        documents: [
            {name: "document1", date: "07.09.2021"},
            {name: "document2", date: "08.09.2021"},
            {name: "document3", date: "09.09.2021"}]
        })
    await wrapper.vm.$forceUpdate()
    expect(wrapper.html()).toContain("document1")
    expect(wrapper.html()).toContain("document2")
    expect(wrapper.html()).toContain("document3")
})

    test('Added new document to documents', () => {
        const wrapper = mount(Documents, {
            localVue,
            vuetify})
        const button = wrapper.find('#addButton')
        const countFiles = wrapper.vm.documents.length
        button.trigger('click')
        expect(wrapper.vm.documents.length).toBe(countFiles+1)
    })

    test('Displayed added document', async () => {
        const wrapper = mount(Documents, {
            localVue,
            vuetify})
        const button = wrapper.find('#addButton')
        button.trigger('click')
        await wrapper.vm.$forceUpdate()
        expect(wrapper.html()).toContain(wrapper.vm.documents[wrapper.vm.documents.length-1].name)
    })

    test('Added few documents to documents', () => {
        const wrapper = mount(Documents, {
            localVue,
            vuetify})
        const button = wrapper.find('#addButton')
        const countFiles = wrapper.vm.documents.length
        button.trigger('click')
        button.trigger('click')
        button.trigger('click')
        button.trigger('click')
        expect(wrapper.vm.documents.length).toBe(countFiles+4)
    })

    test('Document removed from documents', async () => {
        const wrapper = mount(Documents,{
            localVue,
            vuetify})
        wrapper.setData({documents: [{name: "document", date: ""}]})
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#'+wrapper.vm.documents[0].name)
        const countFiles = wrapper.vm.documents.length
        button.trigger('click')
        expect(wrapper.vm.documents.length).toBe(countFiles-1)
    })

    test('Removed document added to removedDocuments', async () => {
        const wrapper = mount(Documents,{
            localVue,
            vuetify})
        wrapper.setData({documents: [{name: "document", date: ""}]})
        await wrapper.vm.$forceUpdate()
        const button = wrapper.find('#'+wrapper.vm.documents[0].name)
        const countRmvFiles = wrapper.vm.removedDocuments.length
        button.trigger('click')
        expect(wrapper.vm.removedDocuments.length).toBe(countRmvFiles+1)
    })

    test('Document added and removed', async () => {
        const wrapper = mount(Documents, {
            localVue,
            vuetify})
        const addButton = wrapper.find('#addButton')
        addButton.trigger('click')
        await wrapper.vm.$forceUpdate()
        const addedDocument = wrapper.vm.documents[wrapper.vm.documents.length-1]
        const rmvButton = wrapper.find('#'+addedDocument.name)
        rmvButton.trigger('click')
        expect(wrapper.vm.removedDocuments).toContain(addedDocument)
    })

})