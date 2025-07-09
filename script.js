let shareCount = 0;
const maxShares = 5;

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('formSubmitted')) {
    disableForm();
  }

  document.getElementById('shareBtn').addEventListener('click', () => {
    if (shareCount < maxShares) {
      shareCount++;
      window.open(`https://wa.me/?text=Hey%20Buddy,%20Join%20Tech%20For%20Girls%20Community`, '_blank');
      document.getElementById('shareCount').textContent = `Click count: ${shareCount}/${maxShares}`;
    }

    if (shareCount === maxShares) {
      document.getElementById('shareBtn').disabled = true;
      alert("Sharing complete. Please continue.");
    }
  });

  document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (shareCount < maxShares) {
      alert("Please complete sharing first (5/5).");
      return;
    }

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const college = document.getElementById('college').value;
    const file = document.getElementById('screenshot').files[0];

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result.split(',')[1];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("college", college);
      formData.append("file", base64File);

      const scriptURL = "https://script.google.com/macros/s/AKfycbwd-ihRyJGzqeuRugpJFPOumAVapuvsYRbiPgQPkGd7tij9h0Lwj6ZumkA4nC1R0jl-/exec";

      try {
        await fetch(scriptURL, { method: 'POST', body: formData });
        localStorage.setItem('formSubmitted', 'true');
        disableForm();
        document.getElementById('message').classList.remove('hidden');
      } catch (error) {
        alert("Submission failed. Try again.");
      }
    };

    reader.readAsDataURL(file);
  });
});

function disableForm() {
  document.querySelectorAll('input, button').forEach(el => el.disabled = true);
}
