#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'https://deploy-preview-2327--semgrep-docs-prod.netlify.app/.netlify/functions/index-full-docs';

async function runFullIndexing() {
  console.log('🚀 Starting full Semgrep documentation indexing...');
  
  let batchNumber = 0;
  let isComplete = false;
  
  while (!isComplete) {
    try {
      console.log(`\n📦 Processing batch ${batchNumber + 1}...`);
      
      const response = await axios.get(`${BASE_URL}?batch=${batchNumber}`, {
        timeout: 120000 // 2 minutes timeout
      });
      
      const data = response.data;
      
      if (data.success) {
        console.log(`✅ Batch ${data.batchNumber}/${data.totalBatches} completed`);
        console.log(`   📄 Documents indexed: ${data.documentsInBatch}`);
        console.log(`   📊 Total URLs: ${data.totalUrls}`);
        
        isComplete = data.isComplete;
        batchNumber++;
        
        if (!isComplete) {
          console.log(`⏳ Waiting 2 seconds before next batch...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } else {
        console.error('❌ Batch failed:', data.message);
        break;
      }
      
    } catch (error) {
      console.error(`❌ Error processing batch ${batchNumber + 1}:`, error.message);
      
      if (error.response?.status === 504) {
        console.log('⏳ Timeout occurred, waiting 5 seconds before retry...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      } else {
        break;
      }
    }
  }
  
  if (isComplete) {
    console.log('\n🎉 Full indexing completed successfully!');
    console.log('🔍 You can now search the entire Semgrep documentation');
  } else {
    console.log('\n⚠️  Indexing was interrupted');
  }
}

// Run the indexing
runFullIndexing().catch(console.error);
