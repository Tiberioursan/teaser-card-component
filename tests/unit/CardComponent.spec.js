import { test } from 'vitest'
import { mount } from '@vue/test-utils'
import CardComponent from '../../src/components/CardComponent.vue'
import assert from 'assert'

test('CardComponent - renders props correctly', () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            preTitle: 'Test PreTitle',
            badge: 'Test Badge',
            image: 'Test Image',
            tags: ['Test Tag1', 'Test Tag2'],
            cardType: 'horizontalCard',
        }
    })

    assert.strictEqual(wrapper.vm.id, 1)
    assert.strictEqual(wrapper.vm.title, 'Test Title')
    assert.strictEqual(wrapper.vm.ingress, 'Test Ingress')
    assert.strictEqual(wrapper.vm.preTitle, 'Test PreTitle')
    assert.strictEqual(wrapper.vm.badge, 'Test Badge')
    assert.strictEqual(wrapper.vm.image, 'Test Image')
    assert.deepStrictEqual(wrapper.vm.tags, ['Test Tag1', 'Test Tag2'])
    assert.strictEqual(wrapper.vm.cardType, 'horizontalCard')
})

test('CardComponent - emits action_media event on image click', async () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            cardType: 'detailedCard',
        }
    })

    await wrapper.find('.card-image img').trigger('click')
    const emittedEvents = wrapper.emitted()
    assert.strictEqual(emittedEvents['action_media'].length, 1)
    assert.deepStrictEqual(emittedEvents['action_media'][0], [{ title: 'Test Title', id: 1 }])
})

test('CardComponent - emits action_content event on title click', async () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            cardType: 'detailedCard',
        }
    })

    await wrapper.find('.card-title').trigger('click')
    const emittedEvents = wrapper.emitted()
    assert.strictEqual(emittedEvents['action_content'].length, 1)
    assert.deepStrictEqual(emittedEvents['action_content'][0], [{ title: 'Test Title', id: 1 }])
})

test('CardComponent - truncates text longer than the specified length', () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            cardType: 'horizontalCard',
        }
    })
    const text = 'This is a long text that needs to be truncated.'
    const truncated = wrapper.vm.truncateText(text, 30)
    assert.strictEqual(truncated.length <= 30, true)
})

test('CardComponent - updates displayedIngress and cardIsHovered on mouse events', async () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            cardType: 'horizontalCard',
        }
    })

    await wrapper.trigger('mouseover')
    assert.strictEqual(wrapper.vm.cardIsHovered, true)
    assert.strictEqual(wrapper.vm.displayedIngress, wrapper.vm.props.ingress)

    await wrapper.trigger('mouseout')
    assert.strictEqual(wrapper.vm.cardIsHovered, false)
    assert.strictEqual(wrapper.vm.displayedIngress, wrapper.vm.truncateText(wrapper.vm.props.ingress, 120))
})

test('CardComponent - handleMouseover and handleMouseout work correctly', async () => {
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: 'Test Title',
            ingress: 'Test Ingress',
            cardType: 'horizontalCard',
        }
    })

    await wrapper.trigger('mouseover')
    assert.strictEqual(wrapper.vm.cardIsHovered, true)

    await wrapper.trigger('mouseout')
    assert.strictEqual(wrapper.vm.cardIsHovered, false)
})

test('CardComponent - renders correctly with long text', () => {
    const longText = 'This is a very long text that should be truncated when displayed in the component.'
    const wrapper = mount(CardComponent, {
        props: {
            id: 1,
            title: longText,
            ingress: 'Test Ingress',
            cardType: 'horizontalCard',
        }
    })

    const displayedTitle = wrapper.find('.card-title').text()
    assert.strictEqual(displayedTitle.length <= 30, true)
    assert.strictEqual(displayedTitle, wrapper.vm.truncateText(longText, 30))
})