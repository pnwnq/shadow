const { db } = require('../lib/prisma');

async function main() {
      const itemId = 'cmc2pf59q0001ki19g40qk6ln';
      const nfcTagId = 'U盘';

      console.log(`Attempting to bind NFC Tag "${nfcTagId}" to Item ID "${itemId}"...`);

      try {
            const updatedItem = await db.item.update({
                  where: { id: itemId },
                  data: { nfcTagId: nfcTagId },
            });
            console.log('✅ Successfully updated item:');
            console.log(updatedItem);
      } catch (error) {
            console.error('❌ Failed to update item:', error);
      } finally {
            await db.$disconnect();
      }
}

main(); 