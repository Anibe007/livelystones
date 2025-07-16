  const form = document.getElementById('userForm');
  const previewImage = document.getElementById('previewImage');
  const profilePicture = document.getElementById('profilePicture');

  // Preview uploaded image
  profilePicture.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const requiredFields = ['profilePicture', 'firstName', 'lastName', 'email', 'num', 'occupation', 'dob'];
    let isValid = true;

    requiredFields.forEach(id => {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = '#ccc';
      }
    });

    const genderChecked = document.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
      alert('⚠️ Please select your gender.');
      isValid = false;
    }

    if (!isValid) {
      alert('⚠️ Please fill in all required fields correctly.');
      return;
    }

    // Save form data to localStorage (including image preview if available)
    const formData = {
      firstName: document.getElementById('firstName').value.trim(),
      middleName: document.getElementById('middleName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      number: document.getElementById('num').value.trim(),
      gender: genderChecked.value,
      occupation: document.getElementById('occupation').value.trim(),
      dob: document.getElementById('dob').value.trim(),
      image: previewImage.src || ""
    };

    localStorage.setItem('livelyStonesUser', JSON.stringify(formData));

    // Redirect to success page
    window.location.href = './success.html';
  });
