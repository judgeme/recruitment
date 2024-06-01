<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIndexResourceState } from '@ownego/polaris-vue'
import { useTimeAgo } from '@vueuse/core'
import { createRatingFromFirstDigit } from '@/utils/helper'

//@ts-ignore
import IconWrite from '@/components/icons/IconWrite.vue'
import { RouterLink } from 'vue-router'
import StarRating from '@/components/ui/StarRating.vue'

const selected = ref(0)

const handleTabChange = (selectedTabIndex: number) => (selected.value = selectedTabIndex)

const reviews = [
  {
    shopName: 'WhiskerWear Pet Store',
    productName: 'WhiskerWear Premium Collar',
    reviewer: {
      name: 'Sergio Gislason',
      email: 'Lela_Lockman@yahoo.com',
      image:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/587.jpg',
      country: 'Belarus'
    },
    review: {
      date: '2024-05-17T14:59:29.270Z',
      rating: '955',
      reviewTitle: 'Rustic',
      reviewBody:
        'Possimus laborum laudantium eaque dicta facere. Voluptas officia saepe totam. Dolor quasi quod.',
      reviewImages: [
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats'
      ],
      verifiedPurchase: false
    },
    id: '1'
  },
  {
    shopName: 'WhiskerWear Pet Store',
    productName: 'WhiskerWear Premium Collar',
    reviewer: {
      name: 'Roosevelt Torphy',
      email: 'Zora_Davis4@hotmail.com',
      image:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/492.jpg',
      country: 'Morocco'
    },
    review: {
      date: '2023-10-17T12:11:16.910Z',
      rating: '9150',
      reviewTitle: 'Intelligent',
      reviewBody:
        'Ducimus eaque laboriosam exercitationem ex veritatis. Sunt laboriosam distinctio maxime est. Alias totam esse laboriosam culpa nam pariatur natus. Soluta corporis esse repudiandae id atque eligendi ab in pariatur.',
      reviewImages: [
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats'
      ],
      verifiedPurchase: true
    },
    id: '2'
  },
  {
    shopName: 'WhiskerWear Pet Store',
    productName: 'WhiskerWear Premium Collar',
    reviewer: {
      name: 'Mrs. Erick Gleason',
      email: 'Wade41@yahoo.com',
      image:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/664.jpg',
      country: 'Nepal'
    },
    review: {
      date: '2023-11-23T19:48:25.918Z',
      rating: '22739',
      reviewTitle: 'Oriental',
      reviewBody:
        'Libero provident perspiciatis aperiam dignissimos cum mollitia mollitia eius. Sint sapiente iure tempora facere. Sit error eligendi delectus unde animi asperiores necessitatibus modi. Ut ab laborum porro at consequuntur laborum libero ipsam repellat. Odio nam distinctio.',
      reviewImages: [
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats'
      ],
      verifiedPurchase: true
    },
    id: '3'
  },
  {
    shopName: 'WhiskerWear Pet Store',
    productName: 'WhiskerWear Premium Collar',
    reviewer: {
      name: 'Thelma Walsh',
      email: 'Ricardo_Torp63@yahoo.com',
      image:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1007.jpg',
      country: 'Fiji'
    },
    review: {
      date: '2023-11-11T14:35:31.970Z',
      rating: '5111',
      reviewTitle: 'Incredible',
      reviewBody:
        'Error ducimus unde odio architecto aperiam reiciendis nulla quibusdam. Velit consectetur quidem dolorem. Autem expedita voluptate animi dolorum ea ex eos. Dolor deserunt in sit at harum expedita minima rem.',
      reviewImages: [
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats',
        'https://loremflickr.com/640/480/cats'
      ],
      verifiedPurchase: true
    },
    id: '4'
  }
]

const resourceName = {
  singular: 'review',
  plural: 'reviews'
}

const { selectedResources, allResourcesSelected, handleSelectionChange } =
  useIndexResourceState(reviews)

// Create computed properties to format review dates using useTimeAgo
const formattedReviews = computed(() => {
  return reviews.map((review) => {
    const timeAgo = useTimeAgo(review.review.date)
    return {
      ...review,
      review: {
        ...review.review,
        date: timeAgo.value // Get the formatted time ago string
      }
    }
  })
})

// Update the badge for All Reviews dynamically
const allReviewsTab = computed(() => ({
  id: '1',
  content: 'All Reviews',
  badge: reviews.length.toString(),
  accessibilityLabel: 'All customers'
}))

// Update the tabs array dynamically
const tabs = computed(() => [
  allReviewsTab.value,
  // {
  //   id: '2',
  //   content: 'Published Reviews',
  //   badge: '...',
  //   accessibilityLabel: 'Published reviews'
  // },
  // {
  //   id: '3',
  //   content: 'Store Reviews',
  //   badge: '...',
  //   accessibilityLabel: 'Store reviews'
  // },
  // {
  //   id: '4',
  //   content: 'Archive',
  //   badge: '...',
  //   accessibilityLabel: 'Archived reviews'
  // }
])
</script>

<template>
  <Box paddingBlock="400" class="header">
    <Text variant="headingLg" as="h1"> Reviews Dashboard </Text>
    <RouterLink to="/new-review">
      <Button class="button" accessibilityLabel="Write a Product Review">
        Create a Product Review &nbsp;<IconWrite />
      </Button>
    </RouterLink>
  </Box>
  <LegacyCard>
    <Tabs :tabs="tabs" :selected="selected" @select="handleTabChange"></Tabs>
    <IndexTable
    bulkActions='false'
      promotedBulkActions="false"
      selectable="false"
      :resourceName="resourceName"
      :itemCount="reviews.length"
      :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
      @selection-change="handleSelectionChange"
      :headings="[
        { title: 'Customer' },
        { title: 'Created' },
        { title: 'Review' },
        { title: 'Action' },
      ]"
    >
      <IndexTableRow
        v-for="({ id, reviewer, review }, index) in formattedReviews"
        :id="id"
        :key="id"
        :position="index"
        :selected="selectedResources.includes(id)"
      >
        <IndexTableCell>
          <BlockStack gap="200">
            <InlineStack :wrap="false" gap="200" blockAlign="center">
              <Avatar />
              <Text variant="bodyMd" fontWeight="bold" as="span">{{ reviewer.name }}</Text>
            </InlineStack>
            <div>
              {{ reviewer.email }}
            </div>
            <div>From {{ reviewer.country }}</div>
            <div>
              <Badge v-show="review.verifiedPurchase" class="verifiedBadge">Verified</Badge>
            </div>
          </BlockStack>
        </IndexTableCell>

        <IndexTableCell>{{ review.date }}</IndexTableCell>
        <IndexTableCell>
          <BlockStack gap="200">
            <div>
              <StarRating
                :rating="createRatingFromFirstDigit(review.rating)"
                readOnly="true"
                star-size="10"
              />
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="bold">{{ review.reviewTitle }}</Text>
            </div>
            <div class="review-body">
              {{ review.reviewBody }}
            </div>
            <div class="review-body">
              <div class="reviewImages">
                <Avatar
                  size="xl"
                  :source="image"
                  v-for="(image, index) in review.reviewImages"
                  :key="index"
                />
              </div>
              <!-- <img :src="review.reviewImages[0]" /> -->
            </div>
          </BlockStack>
        </IndexTableCell>
        <IndexTableCell>
        </IndexTableCell>
      </IndexTableRow>
    </IndexTable>
  </LegacyCard>
</template>

<style lang="scss">
.review-body {
  white-space: normal; // Allows text to wrap
  word-wrap: break-word; // Breaks long words to prevent overflow
  width: 200px; // Ensures the cell width is used
  box-sizing: border-box; // Ensures padding does not affect width
}

.verifiedBadge {
  background-color: lighten(#329999, 50%);
  color: darken(#329999, 50%);
}
.reviewImages {
  display: flex;
  gap: 10px;
}
/* .Polaris-Tabs__Tab--active {
  background-color: lighten(#329999, 50%);
  color: darken(#329999, 3%);

  &:not([aria-disabled='true']):hover {
    background-color: lighten(#329999, 50%);
    color: darken(#329999, 10%);
  }
}

.Polaris-Link {
  color: #329999;
  &:hover {
    color: darken(#329999, 10%);
  }
}

.Polaris-Badge {
  background-color: lighten(#329999, 35%);
  color: darken(#329999, 20%);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
span.Polaris-Text--root.Polaris-Text--medium.Polaris-Text--bodySm {
  display: flex;
  align-items: center;
} */
</style>
