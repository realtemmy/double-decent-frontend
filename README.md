# Double Decent Frontend V2

## To complete

- Navigation

## To build

- Make alias unique to each user
- Use tinymce for product description setup(admin)
- Keep track and use product's quantity in product page, instead of cartCount
- Set max width for display of the entire app
- In user's, if there was an error getting user from hook, display error message or just keep loading
- In updating user's photo, first delete the prev one if there exist and loader in updating user's profile
- Filtering in order - date, search etc
- Edit address
- Back to login after reseting password?
- Filter on products and user set to fixed

- Ensure CSP is effective against XSS attacks


### Status for delivery

- Paid (blue) - Payment is successful, but order has not been confirmed by the store
- Confirmed(yellow) - Order has been confirmed by the store, and has been / about to be sent out for delivery
- Delivered(green) - User has gotten delivery
- Cancelled(red) - Order was cancelled due to some reasons

### Data management

- Redux/redux-toolkit for Cart items
- React Query - User details, products, etc

### Designs and reference

- Figma: [Double decent](https://www.figma.com/design/fFXluVYjVEUwXhuiC09vgO/Double-Descent-store?node-id=22-10&node-type=canvas&t=sQe3tKEVLbEb3PFP-0)
- Navigation and Header [https://v0.dev/t/lJwnQlHSEBA](https://v0.dev/t/lJwnQlHSEBA)
- Checkout design by [Readymadeui](https://readymadeui.com/)
- Flowbite
- Shadcn

## Optimization

#### Lighthouse results

- Initial values

* Performance - 98
* Accessibility - 88
* Best practices - 100
* SEO - 67
- [Lighthose initial result](./assets/Screenshot%202024-12-24%20201523.png)

- After using Helmet on all pages

* Performance - 97
* Accessibility - 88
* Best practices - 100
* SEO - 77
- [Lighthouse result after Helmet](./assets//Screenshot%202024-12-24%20203331.png)

* - Increment in SEO and a drop in Perfomance
