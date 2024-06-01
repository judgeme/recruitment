<script lang="ts" setup></script>

<template>
    <EmptyState
      heading="There are no store reviews"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>The store reviews feature is being worked on...</p>
    </EmptyState>
    <Divider borderColor="border" borderWidth="100" />
  <BlockStack gap="500" inlineAlign="center">
    <!-- Pagination Controls -->
    <Box paddingBlockStart="300">
      <div>
        <Button
          :disabled="true"
          size="large"
          >Previous</Button
        >
        <span class="pageNumbers">Page 0 of 0</span>
        <Button
          :disabled="true"
          size="large"

          >Next</Button
        >
      </div>
    </Box>
    <Box paddingBlockEnd="300">
      <div class="pagination-info">
        <Badge>1-0 of 0 Reviews</Badge>
      </div>
    </Box>
  </BlockStack>
</template>
