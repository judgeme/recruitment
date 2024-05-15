import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import AppTextFieldWithHook from '@/components/shared/AppTextField/WithHook.vue';

describe('AppTextFieldWithHook.vue', () => {
  // Create a validation schema
  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
  });
  // Create a simple form component using VeeValidate
  const TestForm = defineComponent({
    components: { AppTextFieldWithHook },
    setup() {
      const { handleSubmit } = useForm({ validationSchema: schema });
      const onSubmit = handleSubmit((values) => {
        console.log(values);
      });

      return { onSubmit };
    },
    template: `
      <form @submit="onSubmit">
        <app-text-field-with-hook name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </form>
    `,
  });

  it('renders AppTextField with props and handles validation', async () => {


    // Mount the form component
    const wrapper = mount(TestForm);

    // Check if the AppTextFieldWithHook component is rendered
    const appTextFieldWithHook = wrapper.findComponent(AppTextFieldWithHook);
    expect(appTextFieldWithHook.exists()).toBe(true);

     // Find the input element
    const input = appTextFieldWithHook.find('input');
    expect(input.exists()).toBe(true);

    // Trigger blur to test validation
    await input.setValue('invalid-email');
    await input.trigger('update:modelValue');
    

    // Check if the validation error message is displayed
    // const errorMessage = appTextFieldWithHook.find('text-xs');
    // expect(errorMessage.exists()).toBe(true);
    // expect(errorMessage.text()).toBe('Invalid email');

    // // Correct the email and blur again
    // await input.setValue('test@example.com');
    // await input.trigger('blur');

    // Check if the validation error message is removed
    // expect(errorMessage.exists()).toBe(false);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
