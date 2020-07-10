﻿using Hades.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Data
{
    public class DbDataProvider
    {
        private ApplicationDbContext applicationDbContext;
        private UserManager<ApplicationUser> userManager;

        public DbDataProvider(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            this.applicationDbContext = applicationDbContext;
            this.userManager = userManager;
        }

        /// <summary>
        /// Adds a new user and a group (supposedly with him as a founder).
        /// </summary>
        /// <param name="group">Group to add.</param>
        /// <param name="groupFounder">Groups founder (who is already added in Group as founder).</param>
        /// <returns>void</returns>
        public async Task CreateGroupAsync(Group group, ApplicationUser groupFounder)
        {
            await AddAplicationUserAsync(groupFounder);
            await applicationDbContext.AddAsync(group);

            await applicationDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Gets a group.
        /// </summary>
        /// <param name="groupName">Name of the group to get.</param>
        /// <returns>Founded group.</returns>
        public Group GetGroup(string groupName)
        {
            return applicationDbContext.Groups.FirstOrDefault(g => g.Name.Equals(groupName));
        }

        /// <summary>
        /// Checks if group already exists.
        /// </summary>
        /// <param name="groupName">Name of the group to check.</param>
        /// <returns></returns>
        public bool DoesGroupExist(string groupName)
        {
            if (GetGroup(groupName) == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        /// <summary>
        /// Creates new user with a userName "generated" from his nickname.
        /// </summary>
        /// <param name="applicationUser">Application user to add.</param>
        /// <returns>void</returns>
        public async Task AddAplicationUserAsync(ApplicationUser applicationUser)
        {
            // Use NickName as UserName.
            string consideredUserName = applicationUser.NickName;
            int counter = 0;
            // If this username is already taken, add number.
            while (await GetApplicationUserAsync(consideredUserName) != null)
            {
                // Try it again but with a number.
                consideredUserName = applicationUser.NickName + counter.ToString();
                
                // If we run this again, we need the number incremented to try another username variant.
                counter++;
            }
            applicationUser.UserName = consideredUserName;
            await userManager.CreateAsync(applicationUser);
        }

        /// <summary>
        /// Gets ApplicationUser.
        /// </summary>
        /// <param name="userName">Username of the ApplicationUser to find.</param>
        /// <returns>Founded application user.</returns>
        public async Task<ApplicationUser> GetApplicationUserAsync(string userName)
        {
            return await userManager.FindByNameAsync(userName);
        }

        /// <summary>
        /// Adds an ApplicationUser and adds him as a student to a group
        /// </summary>
        /// <param name="student">Student to add.</param>
        /// <param name="groupName">Group name to add the student to.</param>
        /// <returns>void</returns>
        public async Task AddStudentToAGroupAsync(ApplicationUser student, string groupName)
        {
            Group group = GetGroup(groupName);
            await AddAplicationUserAsync(student);
            student = await GetApplicationUserAsync(student.UserName);
            
            StudentGroup studentGroup = new StudentGroup
            {
                Group = group,
                GroupId = group.GroupId,
                Student = student,
                StudentId = student.Id
            };

            applicationDbContext.StudentGroup.Add(studentGroup);           
            await applicationDbContext.SaveChangesAsync();
        }

        
    }
}
