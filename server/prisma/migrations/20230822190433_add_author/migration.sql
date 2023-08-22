-- CreateTable
CREATE TABLE "tb_message" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_message_id_key" ON "tb_message"("id");
