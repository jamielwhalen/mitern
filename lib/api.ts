
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type AccountType = "STUDENT" | "BUSINESS";

export async function registerUser(email: string, password: string, accountType: AccountType) {
  console.log("in register user", API_URL);
  // Obtain a CSRF token from Spring Boot.
  const csrfResponse = await fetch(
    `${API_URL}/api/csrf`,
    { credentials: "include" }
  );

  if (!csrfResponse.ok) {
    throw new Error("Could not obtain CSRF token");
  }

  const csrf = await csrfResponse.json();

  console.log("API_URL : ", API_URL);
  // Send registration request.
  const response = await fetch(
    `${API_URL}/api/users/register`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        [csrf.headerName]: csrf.token
      },
      body: JSON.stringify({ email , password, accountType})
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ?? "Registration failed"
    );
  }

  return result;
}

export async function loginUser(
  email: string,
  password: string
) {
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // Step 1: Get CSRF token
  const csrfResponse = await fetch(
    `${API_URL}/api/csrf`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!csrfResponse.ok) {
    throw new Error(
      `CSRF request failed: ${csrfResponse.status}`
    );
  }

  const csrfContentType =
    csrfResponse.headers.get("content-type") || "";

  if (!csrfContentType.includes("application/json")) {
    throw new Error(
      `CSRF endpoint returned HTML instead of JSON. URL: ${csrfResponse.url}`
    );
  }

  const csrf = await csrfResponse.json();

  // Step 2: Send login request
  const body = new URLSearchParams({
    email,
    password,
  });

  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
        [csrf.headerName]: csrf.token,
      },
      body: body.toString(),
    }
  );

  // Step 3: Check response
  const contentType =
    response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Login returned a non-JSON response. Status: ${response.status}, URL: ${response.url}`
    );
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Invalid email or password"
    );
  }

  return result;
}


export async function getCurrentUser() {
  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to verify session");
  }

  return response.json();
}

export async function logoutUser() {
  const csrfResponse = await fetch(
    `${API_URL}/api/csrf`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!csrfResponse.ok) {
    throw new Error("Unable to obtain CSRF token");
  }

  const csrf = await csrfResponse.json();

  const response = await fetch(
    `${API_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        [csrf.headerName]: csrf.token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

export async function getMyJobs() {
  const response = await fetch(`${API_URL}/api/jobs/myJobs`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve job listings.");
  }

  return response.json();
}

export async function getAllJobs() {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve job listings.");
  }

  return response.json();
}

export async function getJobById(jobId: number) {
  let url = `${API_URL}/api/jobs/${jobId}`;
  console.log('url : ', url);
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve job listings.");
  }

  return response.json();
}

export type CreateJobRequest = {
  title: string;
  description: string;
  location: string;
  workArrangement: "REMOTE" | "HYBRID" | "ONSITE";
  compensation: string | null;
  applicationDeadline: string | null;
  status: "DRAFT" | "ACTIVE";
};

export async function getCsrfToken(): Promise<string> {
  const response = await fetch(`${API_URL}/api/csrf`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve CSRF token");
  }

  const data = await response.json();

  return data.token;
}

export async function createJob(
  job: CreateJobRequest
) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(
    `${API_URL}/api/jobs`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(job),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Your session has expired. Please sign in again."
      );
    }

    if (response.status === 403) {
      throw new Error(
        "You do not have permission to create jobs, or your security token has expired."
      );
    }

    throw new Error("Unable to create job listing.");
  }

  return response.json();
}