## **Overview**

The Reviews Dashboard Application is a Vue.js-based web application designed for managing product reviews within a Shopify store environment. Leveraging Polaris Vue components ensures seamless integration and consistency with Shopify's design system. The application supports basic CRUD operations, allowing users to add, view, update, and delete product reviews efficiently.

## **Key Features**

- **Responsive Design**: Optimised for both desktop and mobile devices, ensuring a broad accessibility range.
- **CRUD Functionality**: Comprehensive capabilities to create, read, update, and delete reviews through a user-friendly interface.
- **Polaris Vue Integration**: Utilizes Polaris Vue components to maintain visual and functional harmony with Shopify's native interfaces. Polaris design system https://polaris.shopify.com/design

## **Technical Stack**

- **Vue.js**: Utilised for constructing the dynamic and responsive user interface.
- **Polaris Vue**: A collection of Vue components that mirror Shopify’s Polaris design standards.
- **MockAPI.io**: Used to simulate a backend for CRUD operations with a review data model, providing a mock RESTful API.

## **Installation Guide**

1. **Clone the Repository**:
    
    ```bash
    git clone https://github.com/ejiro1994/recruitment
    ```
    
2. **Install Dependencies**:
    
    ```bash
    npm install
    ```
    
3. **Run the Application**:
    
    ```bash
    npm run serve
    ```
    
4. **Access the Application**:
Open **`http://localhost:3000`** in a web browser to start managing product reviews.

## **Application Structure**

- **`DashboardView.vue`**: Main dashboard component hosting navigation tabs for all reviews and published reviews, with additional functionalities to create and edit reviews.
- **`NewReview.vue` & `EditReview.vue`**: Components dedicated to adding new reviews and editing existing ones, equipped with detailed forms.
- **`ReviewsList.vue`**: Displays a comprehensive list of reviews, offering functionalities like filtering, pagination, and bulk actions.

## **API Integration**

### **Endpoints**

The application interfaces with the following endpoints provided by the mock API:

- **GET `/reviews`**: Retrieve all reviews.
- **POST `/reviews`**: Submit a new review.
- **GET `/reviews/:id`**: Fetch a review by its ID.
- **PUT `/reviews/:id`**: Update an existing review.
- **DELETE `/reviews/:id`**: Remove a review permanently.

### **Data Model**

```json
{
	"id": "String",
  "shopName": "String",
  "productName": "String",
  "reviewer": {
    "name": "String",
    "email": "String"
  },
  "review": {
    "rating": "Number",
    "reviewBody": "String",
    "reviewImages": ["String"],
    "verifiedPurchase": "Boolean"
  }
}
```

## **Advanced Features**

- **Pagination**: Enhance navigation and management of large datasets.
- **Filtering**: Quickly locate only published reviews and manage them.

## **Future Considerations**

- **Authentication**: To secure access to review management functionalities.
- **Explore a solution to Polaris Vue bugs**: There seems to be a bug with the `IndexTable` component that causes the all items selected checkbox to not work.
- **More ways to filter**: Work on features to make filtering and sorting even better for the app.