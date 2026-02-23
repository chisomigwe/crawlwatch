import { createClient } from "@supabase/supabase-js";

// Public client (for client-side operations)
export const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  : null;

// Admin client (for server-side operations with full access)
export const supabaseAdmin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

/**
 * Sync a Clerk user to Supabase
 * Call this after user signs up or signs in
 */
export async function syncUserToSupabase(clerkId, email) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .upsert(
      {
        clerk_id: clerkId,
        email: email,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "clerk_id",
      }
    )
    .select()
    .single();

  if (error) {
    console.error("Error syncing user to Supabase:", error);
    throw error;
  }

  return data;
}

/**
 * Check if a user has paid/pro status
 */
export async function checkUserPaymentStatus(clerkId) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("payment_status, payment_tier, payment_id")
    .eq("clerk_id", clerkId)
    .single();

  if (error) {
    console.error("Error checking payment status:", error);
    return { isPro: false, tier: "free" };
  }

  return {
    isPro: data?.payment_status === "paid",
    tier: data?.payment_tier || "free",
    paymentId: data?.payment_id,
  };
}

/**
 * Update user payment status after successful payment
 */
export async function updateUserPaymentStatus(clerkId, paymentId, amount) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update({
      payment_status: "paid",
      payment_tier: "pro",
      payment_id: paymentId,
      payment_amount: amount,
      paid_at: new Date().toISOString(),
    })
    .eq("clerk_id", clerkId)
    .select()
    .single();

  if (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }

  return data;
}

/**
 * Upload a file to Supabase storage
 */
export async function uploadFileToStorage(file, clerkId, fileId) {
  const fileName = `${clerkId}/${fileId}/${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from("documents")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  return data;
}

/**
 * Get signed URL for a file
 */
export async function getFileSignedUrl(filePath, expiresIn = 3600) {
  const { data, error } = await supabaseAdmin.storage
    .from("documents")
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error("Error getting signed URL:", error);
    throw error;
  }

  return data.signedUrl;
}

/**
 * Save a document/item record
 */
export async function saveDocument(clerkId, documentData) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .insert({
      user_id: clerkId,
      ...documentData,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving document:", error);
    throw error;
  }

  return data;
}

/**
 * Get all documents for a user
 */
export async function getUserDocuments(clerkId) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*")
    .eq("user_id", clerkId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting user documents:", error);
    throw error;
  }

  return data;
}

/**
 * Get a single document by ID
 */
export async function getDocumentById(documentId, clerkId) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", clerkId)
    .single();

  if (error) {
    console.error("Error getting document:", error);
    throw error;
  }

  return data;
}

/**
 * Delete a document
 */
export async function deleteDocument(documentId, clerkId) {
  const { error } = await supabaseAdmin
    .from("documents")
    .delete()
    .eq("id", documentId)
    .eq("user_id", clerkId);

  if (error) {
    console.error("Error deleting document:", error);
    throw error;
  }

  return true;
}
