<script lang="ts" setup>
import IconBack from '@/components/icons/IconBack.vue'
import StarRating from '@/components/ui/StarRating.vue'
import { useReviewsStore } from '@/stores/reviewsStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const reviewStore = useReviewsStore()


type RatingDescriptions = {
  [key: number]: string
}

const rating = ref(4)
const router = useRouter()
const reviewTitle = ref('')
const reviewBody = ref('')
const name = ref('')
const email = ref('')

const isFormInvalid = computed(( ) => {
  return reviewTitle.value === '' || name.value === '' || reviewBody.value === ''
})

const ratingDescription: RatingDescriptions = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
}

const currentRatingDescription = computed(() => ratingDescription[rating.value])

const updateRating = (newRating: number) => {
  rating.value = newRating
}

const productDetails = [
  {
    id: '145',
    url: '#',
    avatarSource:
      'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
    shopName: 'WhiskerWear Pet Store',
    productName: 'WhiskerWear Premium Collar'
  }
]

const isCollapse = ref(false)
const handleClick = () => {
  isCollapse.value = !isCollapse.value
}

const validImageTypes = ['image/jpeg', 'image/png']
const files = ref<File[]>([])

const handleDrop = (acceptedFiles: File[]) => {
  const imageFiles = acceptedFiles.filter((file) => validImageTypes.includes(file.type))
  files.value = [...files.value, ...imageFiles]
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const getSource = (file: File) => window.URL.createObjectURL(file)

const active = ref(false)
const cancelSubmit = () => {
  active.value = true
}

const primaryAction = {
  content: 'Discard changes',
  onAction: () => {
    name.value = ''
    reviewTitle.value = ''
    reviewBody.value = ''
    rating.value = 1
    files.value = []
    router.push('/')
  },
  destructive: true
}

const secondaryActions = [
  {
    content: 'Continue editing',
    onAction: () => {
      active.value = false
    }
  }
]

const handleSubmit = () => {

  const review = {
    name: name.value,
    email: email.value,
    reviewTitle: reviewTitle.value,
    reviewBody: reviewBody.value,
    rating: rating.value,
    reviewImages: [...files.value]
  }

  reviewStore.addReview(review)


  name.value = ''
  email.value = ''
  reviewTitle.value = ''
  reviewBody.value = ''
  rating.value = 1
  files.value = []
  reviewStore.getReviews()
  router.push('/')
}
</script>

<template>
  <Box paddingBlock="400" class="header">
    <Text variant="headingLg" as="h1"> Create a Product Review </Text>
    <RouterLink to="/">
      <Button class="button" accessibilityLabel="Back to All Reviews">
        Back to All Reviews &nbsp;<IconBack />
      </Button>
    </RouterLink>
  </Box>
  <Card roundedAbove="sm">
    <InlineGrid gap="400" :columns="2">
      <box>
        <ResourceList :items="productDetails" :showHeader="false">
          <template v-for="item in productDetails" :key="item.id">
            <ResourceItem
              :id="item.id"
              :url="item.url"
              :accessibilityLabel="`View details for ${item.shopName}`"
              :name="item.shopName"
            >
              <template #media>
                <Avatar customer size="md" :name="item.shopName" :source="item.avatarSource" />
              </template>
              <Text variant="bodyMd" as="h3"> Product Name: {{ item.productName }} </Text>
              <div>Shop Name: {{ item.shopName }}</div>
            </ResourceItem>
          </template>
        </ResourceList>
        <!-- rating -->
        <BlockStack gap="400" align="space-between">
          <Text>Rating: {{ rating }}, {{ currentRatingDescription }}</Text>
          <StarRating @update:rating="updateRating" />
        </BlockStack>
      </box>

      <Box paddingBlock="400" background="bg-surface" borderRadius="200">
        <Button aria-controls="basic-collapsible" :aria-expanded="isCollapse" @click="handleClick">
          Product Details
        </Button>
        <Collapsible id="collapsible" :expandOnPrint="true" :open="isCollapse">
          <Box paddingBlockStart="400">
            <Text as="p">
              Personalise your cat collar with a beautiful custom engraved pet ID tag to ensure your
              pet always has a ticket home if ever lost. Available in 12 styles — each of our
              quality metal pet tags is deeply & clearly engraved using a diamond-tipped stylus with
              mechanical precision
            </Text>
            <br />
            <Divider />
          </Box>
        </Collapsible>
      </Box>
    </InlineGrid>
    <BlockStack gap="200">
      <Form @submit.prevent="handleSubmit">
        <FormLayout>
          <!-- name -->
          <TextField
            v-model="name"
            label="Name"
            type="text"
            autoComplete="name"
            placeholder="Enter reviewer's name"
          />
          <!-- email -->
          <TextField
            v-model="email"
            label="Email"
            type="email"
            autoComplete="name"
            placeholder="Enter reviewer's email address"
          />

          <!-- Review Title -->
          <TextField
            v-model="reviewTitle"
            label="Review Title"
            type="text"
            autoComplete="off"
            placeholder="Give the review a title"
          />

          <!-- Review Body -->
          <TextField
            v-model="reviewBody"
            label="Review Body"
            type="text"
            :multiline="6"
            autoComplete="off"
            placeholder="Write the review here"
          />

          <!-- upload image -->
          <div v-if="files.length">
            <LegacyStack vertical>
              <LegacyStack v-for="(file, index) in files" :key="index" alignment="center">
                <Thumbnail
                  size="small"
                  :alt="file.name"
                  :source="validImageTypes.includes(file.type) ? getSource(file) : 'IconWrite'"
                />
                <div>
                  {{ file.name }}&nbsp;
                  <Text variant="bodySm" as="p">{{ file.size }} bytes</Text>
                </div>
                <Button @click="removeFile(index)" accessibilityLabel="Remove Image">Remove</Button>
              </LegacyStack>
            </LegacyStack>
          </div>
          <DropZone
            v-else
            @drop="handleDrop"
            accept="image/jpeg, image/png"
            label="Upload Review Images"
          >
            <DropZoneFileUpload />
          </DropZone>
        </FormLayout>
        <!-- Buttons -->
        <br />
        <InlineStack align="end">
          <ButtonGroup>
            <Button @click="cancelSubmit" accessibilityLabel="Cancel">Cancel Product Review</Button>
            <Button variant="primary" tone="" accessibilityLabel="Submit Review" type="submit" :disabled="isFormInvalid">
              Submit Product Review
            </Button>
          </ButtonGroup>
        </InlineStack>
      </Form>
    </BlockStack>
    <Modal
      sectioned
      :open="active"
      :primary-action="primaryAction"
      :secondary-actions="secondaryActions"
      @close="active = false"
    >
      <template #title> Discard all unsaved changes </template>

      <p>If you discard changes, you'll lose any edits you made.</p>
    </Modal>
  </Card>
</template>
